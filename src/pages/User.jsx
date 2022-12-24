import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { apiRequest } from "../utils/apiRequest";
import Input from "../components/Input";
import Notification from "../components/Notification";
import { useTitle } from "../utils/useTitle";

const User = () => {
  useTitle("Circlenity - Users");
  const [titlex, setTitlex] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [id, setId] = useState(0);
  const [notif, setNotif] = useState(false);
  const [message, setMessage] = useState("");

  const userTitle = async (Title) => {
    if (Title === "create") {
      setTitlex("Create User");
    } else {
      setTitlex("Edit User");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    apiRequest("/user?&created=1", "get")
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

  const createUser = async (e) => {
    e.preventDefault();
    const body = {
      title: title,
      firstName: firstName,
      lastName: lastName,
      email: email,
      picture: picture,
    };
    apiRequest("user/create", "post", body)
      .then((res) => {
        setNotif("Success");
        setMessage("create user");
      })
      .catch((err) => {
        setNotif("Error");
        setMessage("create user");
      })
      .finally(() => {
        fetchUser();
      });
  };

  const editUser = async (e) => {
    e.preventDefault();
    const body = {
      title: title,
      firstName: firstName,
      lastName: lastName,
      email: email,
      picture: picture,
      id: id,
    };
    apiRequest(`user/${id}`, "put", body)
      .then((res) => {
        setNotif("Success");
        setMessage("edit user");
      })
      .catch((err) => {
        setNotif("Error");
        setMessage("edit user");
      })
      .finally(() => {
        fetchUser();
      });
  };

  const deleteUser = async (id) => {
    apiRequest(`user/${id}`, "delete")
      .then((res) => {
        setNotif("Success");
        setMessage("delete user");
      })
      .catch((err) => {
        setNotif("Error");
        setMessage("delete user");
      })
      .finally(() => {
        fetchUser();
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
                userTitle("create");
                setId(0);
                setTitle("");
                setFirstName("");
                setLastName("");
                setEmail("");
                setPicture("");
              }}
              htmlFor="create-edit-user"
              className="bg-primary rounded-md text-white font-normal py-3 px-4 cursor-pointer"
            >
              Create User
            </label>
            <div className="w-full my-5">
              <div className="text-graynew flex flex-row text-[10px] items-center md:text-[12px] lg:text-[18px] px-3 md:px-7 py-0.5 space-x-2 mb-1 font-semibold break-words">
                <p className="w-[40%] text-center text-putih">Name</p>
                <p className="w-[20%] text-center ">Picture</p>
                <p className="w-[40%] text-center">Action</p>
              </div>
              {users.map((item) => (
                <div key={item.id} className="w-full">
                  <hr className="mx-3 border border-graynew opacity-50" />
                  <div className="w-full flex flex-row text-[7px] items-center md:text-[12px] lg:text-[18px] text-abu px-3 md:px-7 py-1 space-x-2">
                    <p className="w-[40%] text-center">
                      {item.firstName} {item.lastName}
                    </p>
                    <div className="w-[20%] flex justify-center items-center">
                      <label htmlFor="img">
                        <img
                          onClick={() => setPicture(item.picture)}
                          className="rounded-full w-8 h-8 md:w-12 md:h-12 object-cover cursor-pointer"
                          src={item.picture}
                          alt="profile"
                        />
                      </label>
                    </div>
                    <div className="w-[40%] flex flex-row space-x-3 justify-center items-center font-semibold text-md">
                      <label
                        onClick={() => {
                          userTitle("edit");
                          setId(item.id);
                          setTitle(item.title);
                          setFirstName(item.firstName);
                          setLastName(item.lastName);
                          setEmail(item.email);
                          setPicture(item.picture);
                        }}
                        className="text-primary cursor-pointer"
                        htmlFor="create-edit-user"
                      >
                        Edit
                      </label>
                      <label
                        onClick={() => setId(item.id)}
                        htmlFor="delete-user"
                        className="text-delete cursor-pointer"
                      >
                        Delete
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              {/* modal delete */}
              <input
                type="checkbox"
                id="delete-user"
                className="modal-toggle"
              />
              <div className="modal">
                <div className="modal-box bg-white shadow-lg py-8 px-7">
                  <p className="text-center text-md">
                    Are you sure want to delete this user?
                  </p>
                  <div className="flex flex-row space-x-10 justify-center mt-5">
                    <label
                      htmlFor="delete-user"
                      className="border border-graynew rounded-md text-graynew font-normal py-3 text-center w-28 cursor-pointer"
                    >
                      No
                    </label>
                    <Button
                      id="btn-delete"
                      label="Yes"
                      color="Delete"
                      onClick={() => deleteUser(id)}
                    />
                  </div>
                </div>
              </div>
              {/* end modal delete */}
            </div>

            {/* modal create edit */}
            <input
              type="checkbox"
              id="create-edit-user"
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box bg-white shadow-lg">
                <h1 className="text-center font-semibold text-xl">{titlex}</h1>
                <form
                  onSubmit={
                    titlex === "Create User"
                      ? (create) => createUser(create)
                      : (edit) => editUser(edit)
                  }
                  className="flex flex-col p-5 gap-5 break-words"
                >
                  <label htmlFor="dropdown-title" className="sr-only"></label>
                  <select
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    id="dropdown-title"
                    className="w-full border border-graynew placeholder:bg-graynew text-black rounded-md py-2 px-3 font-light"
                  >
                    <option value="" selected disabled>
                      Title
                    </option>
                    <option value="mr" id="mr">
                      mr
                    </option>
                    <option value="mrs" id="mrs">
                      mrs
                    </option>
                    <option value="miss" id="miss">
                      miss
                    </option>
                  </select>
                  <Input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    id="firstName"
                    placeholder="Firstname"
                    required
                  />
                  <Input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    id="lastName"
                    placeholder="Lastname"
                    required
                  />
                  {titlex === "Create User" ? (
                    <Input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      id="email"
                      placeholder="Email"
                      required
                    />
                  ) : (
                    ""
                  )}
                  <Input
                    onChange={(e) => setPicture(e.target.value)}
                    value={picture}
                    type="text"
                    id="picture"
                    placeholder="Picture URL"
                    required
                  />
                  <div className="flex flex-row justify-center space-x-10">
                    <label
                      htmlFor="create-edit-user"
                      className="border border-graynew rounded-md text-graynew font-normal py-3 text-center w-28 cursor-pointer"
                    >
                      Close
                    </label>
                    <Button id="btn-submit" label="Submit" color="Primary" />
                  </div>
                </form>
              </div>
            </div>
            {/* end modal create edit*/}
          </div>
          <Notification closeNotif={() => setNotif(false)} trigger={notif}>
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
            <img src={picture} alt="" />
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

export default User;
