export const baseuri = "http://localhost:4444";
export const postRequest = async (uri, body) => {
  const postResponse = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const postData = await postResponse.json();
  if (!postResponse.ok) {
    let message;
    if (postData?.message) {
      message = postData.message;
    } else {
      message = postData;
    }
    return { error: true, message };
  }
  return postData;
};
export const getRequest = async (uri) => {
  const getResponse = await fetch(uri);
  const getData = await getResponse.json();
  return getData;
};
