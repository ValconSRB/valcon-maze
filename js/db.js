// new endpoint for => boris94kg@gmail.com
const API = "https://sheetdb.io/api/v1/a3fgn1d8hh50u";

const OLD_API = "https://sheetdb.io/api/v1/089lzmxl5ymnb";

export const insertData = async (data) => {
  try {
    const result = await (
      await fetch(API, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              id: "INCREMENT",
              date: "DATETIME",
              ...data,
            },
          ],
        }),
      })
    ).json();
    sessionStorage.setItem("visited", JSON.stringify("true"));
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateData = async (data) => {
  try {
    const result = await fetch(`${API}/email/${data.email}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          score: data.score,
          requiredTime: data.requiredTime,
        },
      }),
    }).then((response) => response.json());
    return result;
  } catch (error) {
    console.log(error);
  }
};
