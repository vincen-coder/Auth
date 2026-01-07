const DB_URL = "http://localhost:3000/user";

// FUNCTION 1: Sign Up (Write to DB)
export const signUpUser = async (userData) => {
  const response = await fetch(DB_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response;
};

// FUNCTION 2: Login (Read from DB)
export const loginUser = async (email, password) => {
  const response = await fetch(`${DB_URL}?email=${email}&password=${password}`);
  const users = await response.json();
  return users; // Returns an array
};