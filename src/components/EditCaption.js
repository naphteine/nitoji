import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Input from "./form/Input";
import Checkbox from "./form/Checkbox";
import Swal from "sweetalert2";

const EditCaption = () => {
  const navigate = useNavigate();
  const { jwtToken } = useOutletContext();

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  const [caption, setCaption] = useState({
    id: 0,
    title: "",
    description: "",
    tags: [],
    tags_array: [Array(13).fill(false)],
  });

  // get id from the URL
  let { id } = useParams();
  if (id === undefined) {
    id = 0;
  }

  useEffect(() => {
    if (jwtToken === "") {
      navigate("/giris");
      return;
    }

    if (id === 0) {
      // adding a caption
      setCaption({
        id: 0,
        title: "",
        description: "",
        tags: [],
        tags_array: [Array(13).fill(false)],
      });

      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      fetch(`${process.env.REACT_APP_BACKEND}/tags`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          const checks = [];

          data.forEach((g) => {
            checks.push({ id: g.id, checked: false, tag: g.tag });
          });

          setCaption((m) => ({
            ...m,
            tags: checks,
            tags_array: [],
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // editing an existing caption
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", "Bearer " + jwtToken);

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      fetch(`${process.env.REACT_APP_BACKEND}/user/captions/${id}`, requestOptions)
        .then((response) => {
          if (response.status !== 200) {
            setError("Invalid response code: " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);

          const checks = [];

          data.tag.forEach((g) => {
            if (data.caption.tags_array.indexOf(g.id) !== -1) {
              checks.push({ id: g.id, checked: true, tag: g.tag });
            } else {
              checks.push({ id: g.id, checked: false, tag: g.tag });
            }
          });

          // set state
          setCaption({
            ...data.caption,
            tags: checks,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, jwtToken, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = [];
    let required = [
      { field: caption.title, name: "title" },
      { field: caption.description, name: "description" },
    ];

    required.forEach(function (obj) {
      if (obj.field === "") {
        errors.push(obj.name);
      }
    });

    if (caption.tags_array.length === 0) {
      Swal.fire({
        title: "Error!",
        text: "You must choose at least one tag!",
        icon: "error",
        confirmButtonText: "OK",
      });
      errors.push("tags");
    }

    setErrors(errors);

    if (errors.length > 0) {
      return false;
    }

    // passed validation, so save changes
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + jwtToken);

    // assume we are adding a new caption
    let method = "PUT";

    if (caption.id > 0) {
      method = "PATCH";
    }

    const requestBody = caption;

    let requestOptions = {
      body: JSON.stringify(requestBody),
      method: method,
      headers: headers,
      credentials: "include",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/user/captions/${caption.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          if (caption.id !== 0) {
            navigate(`/dict/${caption.id}`);
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = () => (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setCaption({
      ...caption,
      [name]: value,
    });
  };

  const handleCheck = (event, position) => {
    console.log("handleCheck called");
    console.log("value in handleCheck:", event.target.value);
    console.log("checked is", event.target.checked);
    console.log("position is", position);

    let tmpArr = caption.tags;
    tmpArr[position].checked = !tmpArr[position].checked;

    let tmpIDs = caption.tags_array;
    if (!event.target.checked) {
      tmpIDs.splice(tmpIDs.indexOf(event.target.value));
    } else {
      tmpIDs.push(parseInt(event.target.value, 10));
    }

    setCaption({
      ...caption,
      tags_array: tmpIDs,
    });
  };

  const confirmDelete = () => {
    Swal.fire({
      title: 'Delete caption?',
      text: "You cannot undo this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + jwtToken)

        const requestOptions = {
          method: "DELETE",
          headers: headers,
        }

        fetch(`${process.env.REACT_APP_BACKEND}/user/captions/${caption.id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              console.log(data.error);
            } else {
              navigate(`/dict/${caption.id}`);
            }
          })
          .catch(err => { console.log(err) });
      }
    })
  }

  if (error !== null) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>
        <h2>Başlık Aç</h2>
        <hr />
        {/* <pre>{JSON.stringify(caption, null, 3)}</pre> */}

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={caption.id} id="id"></input>

          <Input
            title={"Başlık"}
            className={"form-control"}
            type={"text"}
            name={"title"}
            value={caption.title}
            onChange={handleChange("title")}
            errorDiv={hasError("title") ? "text-danger" : "d-none"}
            errorMsg={"Lütfen başlık giriniz"}
          />

          <Input
            title={"Açıklama (Okunuşlar)"}
            className={"form-control"}
            type={"text"}
            name={"description"}
            value={caption.description}
            onChange={handleChange("description")}
            errorDiv={hasError("description") ? "text-danger" : "d-none"}
            errorMsg={"Lütfen açıklama giriniz"}
          />

          <hr />

          <h3>Tagler</h3>

          {caption.tags && caption.tags.length > 1 && (
            <>
              {Array.from(caption.tags).map((g, index) => (
                <Checkbox
                  title={g.tag}
                  name={"tag"}
                  key={index}
                  id={"tag-" + index}
                  onChange={(event) => handleCheck(event, index)}
                  value={g.id}
                  checked={caption.tags[index].checked}
                />
              ))}
            </>
          )}

          <hr />

          <button className="btn btn-primary">Save</button>

          {caption.id > 0 && (
            <a href="#!" className="btn btn-danger ms-2" onClick={confirmDelete}>
              Delete caption
            </a>
          )}
        </form>
      </div>
    );
  }
};

export default EditCaption;
