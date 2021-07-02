export async function getTodos() {
    try {
      const url = "http://localhost:7000/api/todos";
      const response =   (await fetch(url));
      return await response.json();
    } catch (err) {
      console.log("Error - getTodos() ", err);
      throw err;
    }
  }