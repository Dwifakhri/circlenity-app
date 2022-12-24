import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Input from "../components/Input";
import { apiRequest } from "../utils/apiRequest";
import Notification from "../components/Notification";
import { useTitle } from "../utils/useTitle";

const Post = () => {
  useTitle("Circlenity - Posts");
  const [titlex, setTitlex] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const [text, setText] = useState("");
  const [likes, setLikes] = useState(0);
  const [image, setImage] = useState("");
  const [idUser, setIdUser] = useState("");
  const [idPost, setIdPost] = useState("");
  const [notif, setNotif] = useState(false);
  const [message, setMessage] = useState("");

  const postTitle = async (Title) => {
    if (Title === "create") {
      setTitlex("Create Post");
    } else {
      setTitlex("Edit Post");
    }
  };

  useEffect(() => {
    fetchPost();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    apiRequest("user?&created=1", "get")
      .then((res) => {
        const results = res.data;
        setUsers(results);
      })
      .catch((err) => {
        setNotif("Error");
        setMessage("get users");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchPost = async () => {
    setLoading(true);
    apiRequest(`post?created=1`, "get")
      .then((res) => {
        const results = res.data;
        setPosts(results);
        setNotif(true);
      })
      .catch((err) => {
        setNotif("Error");
        setMessage("get posts");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createPost = async (e) => {
    e.preventDefault();
    const body = {
      owner: idUser,
      text: text,
      likes: likes,
      tags: tags,
      image: image,
    };
    apiRequest("post/create", "post", body)
      .then((res) => {
        setNotif("Success");
        setMessage("create post");
      })
      .catch((err) => {
        setNotif("Error");
        setMessage("create post");
      })
      .finally(() => {
        fetchPost();
      });
  };

  const editPost = async (e) => {
    e.preventDefault();
    const body = {
      owner: idUser,
      text: text,
      likes: likes,
      tags: tags,
      image: image,
    };
    apiRequest(`post/${idPost}`, "put", body)
      .then((res) => {
        setNotif("Success");
        setMessage("edit post");
      })
      .catch((err) => {
        setNotif("Error");
        setMessage("edit post");
      })
      .finally(() => {
        fetchPost();
      });
  };

  const deletePost = async (idPost) => {
    apiRequest(`post/${idPost}`, "delete")
      .then((res) => {
        setNotif("Success");
        setMessage("delete post");
      })
      .catch((err) => {
        setNotif("Error");
        setMessage("delete post");
      })
      .finally(() => {
        fetchPost();
      });
  };

  return (
    <Layout>
      {loading ? (
        <p className="flex justify-center items-center text-xl text-graynew">
          Loading...
        </p>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center">
            <label
              onClick={() => {
                postTitle("create");
                setIdUser("");
                setText("");
                setLikes(0);
                setImage("");
                setTags([]);
              }}
              htmlFor="create-edit-post"
              className="bg-primary rounded-md text-white font-normal py-3 px-4 cursor-pointer"
            >
              Create Post
            </label>
            <div className="w-full my-5">
              <div className="text-graynew flex flex-row text-[10px] items-center md:text-[12px] lg:text-[18px] text-abu  py-0.5 space-x-2 mb-1 font-semibold">
                <p className="w-[25%] text-center text-putih">Text</p>
                <p className="w-[20%] text-center ">Tags</p>
                <p className="w-[15%] text-center">Image</p>
                <p className="w-[20%] text-center ">User</p>
                <p className="w-[20%] text-center">Action</p>
              </div>
              {posts.map((item) => (
                <div key={item.id} className="w-full">
                  <hr className="border border-graynew opacity-50" />
                  <div className="w-full flex flex-row text-[7px] items-center md:text-[12px] lg:text-[18px] py-1 space-x-2 break-words">
                    <p className="w-[25%] text-center">{item.text}</p>

                    <p className="w-[20%] text-center">
                      {item.tags.map((item) => " #" + item)}
                    </p>

                    <div className="w-[15%] flex justify-center items-center">
                      <label htmlFor="img">
                        <img
                          onClick={() => setImage(item.image)}
                          className="w-12 h-12 md:w-20 md:h-20 object-cover cursor-pointer"
                          src={item.image}
                          alt="image"
                        />
                      </label>
                    </div>
                    <p className="w-[20%] text-center">
                      {item.owner.firstName} {item.owner.lastName}
                    </p>
                    <div className="w-[20%] flex flex-row space-x-3 justify-center items-center font-semibold text-md">
                      <label
                        onClick={() => {
                          postTitle("edit");
                          setIdPost(item.id);
                          setIdUser(item.owner.id);
                          setText(item.text);
                          setLikes(item.likes);
                          setImage(item.image);
                          setTags(item.tags);
                        }}
                        className="text-primary cursor-pointer"
                        htmlFor="create-edit-post"
                      >
                        Edit
                      </label>
                      <label
                        onClick={() => setIdPost(item.id)}
                        htmlFor="delete-post"
                        className="text-delete cursor-pointer"
                      >
                        Delete
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* modal delete */}
            <input type="checkbox" id="delete-post" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box bg-white shadow-lg py-8 px-7">
                <p className="text-center text-md">
                  Are you sure want to delete this post?
                </p>
                <div className="flex flex-row space-x-10 justify-center mt-5">
                  <label
                    htmlFor="delete-post"
                    className="border border-graynew rounded-md text-graynew font-normal py-3 text-center w-28 cursor-pointer"
                  >
                    No
                  </label>
                  <Button
                    id="btn-delete"
                    label="Yes"
                    color="Delete"
                    onClick={() => deletePost(idPost)}
                  />
                </div>
              </div>
            </div>
            {/* end modal delete */}

            {/* modal create edit */}
            <input
              type="checkbox"
              id="create-edit-post"
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box bg-white shadow-lg">
                <h1 className="text-center font-semibold text-xl">{titlex}</h1>
                <form
                  onSubmit={
                    titlex === "Create Post"
                      ? (create) => createPost(create)
                      : (edit) => editPost(edit)
                  }
                  className="flex flex-col p-5 gap-5 break-words"
                >
                  <label htmlFor="dropdown-title" className="sr-only"></label>
                  <select
                    onChange={(e) => setIdUser(e.target.value)}
                    id="dropdown-title"
                    className="w-full border border-graynew placeholder:bg-graynew text-black rounded-md py-2 px-3 font-light"
                    value={idUser}
                  >
                    <option value="">Title</option>
                    {users.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.firstName} {item.lastName}
                      </option>
                    ))}
                  </select>
                  <Input
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    type="text"
                    id="text"
                    placeholder="Text"
                    required
                  />
                  <Input
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                    type="text"
                    id="image"
                    placeholder="Image URL"
                    required
                  />
                  <Input
                    onChange={(e) => setLikes(e.target.value)}
                    value={likes}
                    type="number"
                    id="likes"
                    placeholder="Likes"
                  />
                  <Input
                    onChange={(e) => setTags(e.target.value.split(","))}
                    value={tags}
                    type="text"
                    id="tags"
                    placeholder="moon,night,day"
                    required
                  />
                  <div className="flex flex-row justify-center space-x-10">
                    <label
                      htmlFor="create-edit-post"
                      className="border border-graynew rounded-md text-graynew font-normal py-3 text-center w-28 cursor-pointer"
                    >
                      Close
                    </label>
                    <Button id="btn-submit" label="Submit" color="Primary" />
                  </div>
                </form>
              </div>
            </div>
            {/* end modal create edit */}
          </div>
          <Notification closeNotif={() => setNotif(false)} triggerNotif={notif}>
            <p className="text-md font-semibold">{notif}</p>
            <p>
              {notif} {message}
            </p>
          </Notification>
        </>
      )}
      {/* modal image */}
      <input type="checkbox" id="img" className="modal-toggle" />
      <div className="modal">
        <div className="flex space-x-3">
          <div className="modal-box rounded-none bg-white shadow-lg p-0">
            <img src={image} alt="" />
          </div>
          <label
            htmlFor="img"
            className="font-bold text-white text-2xl  cursor-pointer text-start"
          >
            X
          </label>
        </div>
      </div>
      {/* end modal image */}
    </Layout>
  );
};

export default Post;
