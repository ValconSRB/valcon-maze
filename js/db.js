const API_NAME = "https://api.sheetson.com/v2/sheets/rezultati";
const API_KEY = "WR9UcxpITFgHqjfd6TBpbhlEpPmoR8OC6gPJcEiad4iKFcYjvhbVKeMtduQ";
const SHEET_ID = "16TG_KiMRpdecI8G7RUsfBi8BUIEWRyI6_vrZa_cBp6M";

export const insertData = async (data) => {
  try {
    const result = await fetch(API_NAME, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "X-Spreadsheet-Id": SHEET_ID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        date: new Date(Date.now()).toLocaleString()
      }),
    });
    sessionStorage.setItem("visited", JSON.stringify("true"));
    return result.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateData = async (data) => {
  const row = sessionStorage.getItem("row");
  try {
    const result = await fetch(`${API_NAME}/${row}`, {
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "X-Spreadsheet-Id": SHEET_ID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score: data.score,
        requiredTime: data.requiredTime,
      }),
    });
    return result.json();
  } catch (error) {
    console.log(error);
  }
};
