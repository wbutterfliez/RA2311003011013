export async function getToken() {
  let token = localStorage.getItem("token");
  if (token) return token;

  const registerRes = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "dr2603@srmist.edu.in",
      name: "Didhiti_Rai",
      mobileNo: "8767243258",
      githubUsername: "wbutterfliez",
      rollNo: "RA2311003011013",
      accessCode: "QkbpxH"
    })
  });

  const regData = await registerRes.json();

  console.log("REGISTER:", regData);

  const authRes = await fetch("/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: regData.email,
      name: regData.name,
      rollNo: regData.rollNo,
      accessCode: regData.accessCode,
      clientID: regData.clientID,
      clientSecret: regData.clientSecret
    })
  });

  const authData = await authRes.json();

  console.log("AUTH:", authData);

  if (!authData.access_token) {
    console.error("AUTH FAILED:", authData);
    return;
  }

  localStorage.setItem("token", authData.access_token);

  return authData.access_token;
}