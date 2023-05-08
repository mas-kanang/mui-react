import React from "react";

export default function konfirmasi() {
  return <div>konfirmasi</div>;
}

const saveData = async (data) => {
  const response = await fetch(USER_API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  setResponseData(response);
};

const updateData = async (data) => {
  const response = await fetch(USER_API_BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  setResponseData(response);
};

const deleteData = async (id) => {
  const response = await fetch(USER_API_BASE_URL + "/" + id, {
    method: "DELETE",
  });

  console.log(response);
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  setResponseData(response);
};

const editData = async (id) => {
  const response = await fetch(USER_API_BASE_URL + "/" + id, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const res = await response.json();
  // console.log(res);
  setAju(res);
  setIsOpen(true);
};
