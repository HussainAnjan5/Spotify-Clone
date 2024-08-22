import './Admin.scss';
import '../../components/Modal.scss';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSong, getSongs, updateSong, uploadSong } from './adminThunks.js';
import List from '../../components/List.jsx';
import { IoCloseCircle } from 'react-icons/io5';
import Loading from '../../components/Loading.jsx';
import Button from '../../components/Button.jsx';
import ModalWrapper from '../../components/ModalWrapper.jsx';
import Input from '../../components/Input.jsx';

const Admin = () => {
  const [song, setSong] = useState({});
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { songs, isUploading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const formRef = useRef();
  const editFormRef = useRef();

  useEffect(() => {
    dispatch(getSongs());
  }, []);

  // Upload song handlers
  const handleOpenModal = () => setUploadModalOpen(true);
  const handleCloseModal = () => setUploadModalOpen(false);
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    dispatch(uploadSong({ data: formData }));
  };

  // Edit song handlers
  const handleOpenEditModal = (id) => {
    const song = songs.find((song) => song.id === id);
    setSong(song);
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => setEditModalOpen(false);
  const editFormSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(editFormRef.current);
    dispatch(updateSong({ data: formData, id: song.id }));
    setEditModalOpen(false);
  };

  const deleteSongHandler = (id) => {
    dispatch(deleteSong(id));
    setEditModalOpen(false);
  };

  const uploadModal = () => {
    // NOTE: If upload is successful or cancelled then modal will be closed
    if (isUploading === 'idle' || isUploading === 'uploading')
      return (
        <ModalWrapper
          heading="Upload song"
          open={uploadModalOpen}
          handleClose={handleCloseModal}
        >
          <form ref={formRef} onSubmit={formSubmitHandler}>
            <label htmlFor="img">Img</label>
            <Input id="img" type="file" name="img" placeholder="Img" />

            <label htmlFor="song">Song</label>
            <Input type="file" name="song" id="song" />

            <label htmlFor="name">Name</label>
            <Input type="text" name="name" id="name" placeholder="Song name" />

            <Button type="submit" color="white" fullWidth={true}>
              {isUploading === 'idle' && 'Upload'}
              {isUploading === 'uploading' && 'Uploading'}
            </Button>
          </form>
        </ModalWrapper>
      );
  };

  const editModal = () => {
    return (
      <ModalWrapper
        heading="Update song"
        open={editModalOpen}
        handleClose={handleCloseEditModal}
      >
        <form ref={editFormRef} onSubmit={editFormSubmitHandler}>
          <img src={song.img} alt="Song cover" />
          <Input type="file" name="img" placeholder="Img" />

          <label htmlFor="name">Name</label>
          <Input id="name" type="text" name="name" placeholder={song.name} />

          <Button type="submit" color="white" fullWidth={true}>
            Update
          </Button>
          <Button
            color="red"
            fullWidth={true}
            onClick={(e) => {
              e.preventDefault();
              deleteSongHandler(song.id);
            }}
          >
            Delete
          </Button>
        </form>
      </ModalWrapper>
    );
  };

  return (
    <>
      {songs ? (
        <div className="admin">
          <div className="admin__header">
            <div className="admin__card">
              <span>{songs.length}</span> songs
            </div>
            <div className="admin__card">
              <span>{songs.reduce((acc, song) => acc + song.plays, 0)}</span>
              plays
            </div>
            <div className="admin__card" onClick={handleOpenModal}>
              <span>+</span> upload new
            </div>
          </div>
          <div className="admin__list">
            <List list={songs} admin={true} handler={handleOpenEditModal} />
          </div>
        </div>
      ) : (
        <Loading />
      )}

      {uploadModal()}
      {editModal()}

      {song && editModalOpen && 'bad' === 'good' && (
        <div className="modal modal--admin">
          <div className="modal__header">
            <h2>Upload a new song</h2>
            <div className="modal__close">
              <IoCloseCircle onClick={handleCloseEditModal} />
            </div>
          </div>
          <form
            ref={editFormRef}
            className="modal__form"
            onSubmit={editFormSubmitHandler}
          >
            <img src={song.img} alt="Song cover" />
            <input type="file" name="img" id="img" placeholder="Img" />
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder={song.name} />

            <Button type="submit" color="white" fullWidth={true}>
              Update
            </Button>
            <Button
              color="red"
              fullWidth={true}
              onClick={(e) => {
                e.preventDefault();
                deleteSongHandler(song.id);
              }}
            >
              Delete
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default Admin;
