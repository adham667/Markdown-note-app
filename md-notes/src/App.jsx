import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [Add, setAdd] = useState(false);
  const [title, settitle] = useState('');
  const [content, setContent] = useState('');
  const [check, setCheck] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3000/notes');
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleFilechange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target.result;
        setContent(content);
        console.log(content);
      };
      reader.readAsText(file);
    }
  };

  const handleFileUpload = async (event) => {
    const newNote = {
      title,
      content,
    };
    console.log(newNote);
    try {
      const response = await fetch('http://localhost:3000/notes/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error('Failed to upload note');
      }

      const savedNote = await response.json();
      setNotes((prevNotes) => [...prevNotes, savedNote]);
    } catch (error) {
      console.error('Error uploading note:', error);
    }
  };

  async function handleDelete(deleteId) {
    // console.log(id);
    const updatedNotes = notes.filter((note) => note._id !== deleteId);
    setNotes(updatedNotes);

    setSelectedNote(null);
    const response = await fetch('http://localhost:3000/notes/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: deleteId }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete note');
    }
    const data = await response.json();
    console.log(data);
  }


  async function handleCheck() {
    const response = await fetch('http://localhost:3000/notes/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: selectedNote.content }),
    });

    if (!response.ok) {
      throw new Error('Failed to check grammar');
    }
    const data = await response.json();
    setCheck(data);
    console.log(data);
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Notes</h2>
        {
          Add ?
            <div>
              <input type="text" placeholder='Note Title' onChange={(e) => { settitle(e.target.value) }} value={title} />
              <input type="file" onChange={handleFilechange} />
              <div className='buttons'>
                <button onClick={() => setAdd(false)}>Cancel</button>
                <button onClick={handleFileUpload} >upload</button>
              </div>
            </div>
            : <button onClick={() => { setAdd(true); settitle('') }}>Add Note</button>
        }
        <ul className="notes-list">
          {notes.map((note, index) => (
            <li
              key={index}
              onClick={() => setSelectedNote(note)}
              className={selectedNote === note ? 'active' : ''}
            >
              {note.title}
              <span onClick={() => handleDelete(note._id)}>&times;</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        {selectedNote ? (
          <>
            <div className='header'>
              <h1>{selectedNote.title}</h1>
              <div className='grammar-check'>
                <button onClick={handleCheck}>check grammar</button>
                {check && <span>possible misspellings: {check.matches.length}</span>}
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: selectedNote.content }} />
          </>
        ) : (
          <p>Select a note to view its content</p>
        )}
      </div>
    </div>
  );
}

export default App;
