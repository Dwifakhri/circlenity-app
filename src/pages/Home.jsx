import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Input from "../components/Input";
import Card from "../components/Card";
import { apiRequest } from "../utils/apiRequest";
import ReactPaginate from "react-paginate";
import "../styles/index.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentpage] = useState(0);
  const [limit] = useState(8);
  const [total, setTotal] = useState(0);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchPost();
  }, [currentPage]);

  const fetchPost = async () => {
    // setLoading(true);
    apiRequest(`post?limit=${limit}&page=${currentPage}&created=1`, "get")
      .then((res) => {
        const results = res.data;
        setPosts(results);
        const totalPosts = res.total;
        setTotal(totalPosts);
      })
      .catch((err) => {
        console.log("error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePageChange = async (page) => {
    setCurrentpage(page.selected);
  };

  return (
    <Layout>
      {loading ? (
        <p className="flex justify-center items-center text-xl text-graynew">
          Loading...
        </p>
      ) : (
        <>
          <div className="w-52 mb-5">
            <Input type="text" placeholder="Search post by tag" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-6">
            {posts.map((item) => (
              <Card
                key={item.id}
                image={item.image}
                likes={item.likes}
                tags={item.tags}
                first={item.owner.firstName}
                last={item.owner.lastName}
                text={item.text}
                clickImage={() => setImage(item.image)}
              />
            ))}
          </div>
          <div className="text-center py-6 bottom-0 mb-0">
            <ReactPaginate
              pageCount={Math.ceil(total / limit)}
              onPageChange={(page) => handlePageChange(page)}
              containerClassName={"pagination"}
              previousLabel="<< Prev"
              nextLabel="Next >>"
              activeClassName={"active-page"}
              activeLinkClassName={"active"}
              pageLinkClassName={"page-num"}
            />
          </div>
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

export default Home;
