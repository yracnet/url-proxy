export const onLogger = (name, config = {}) => {
  name = `${name}           `.substring(0, 14);
  const { method, url, request = {}, response = { status: "" } } = config;
  console.log(">>>", name, ">", method, url, response.status);
  if (["PROXY-RESPONSE", "PROXY-ERROR"].includes(name)) {
    if (response.status != 200) {
      console.log(
        `
# Linux
curl -X ${method} "${url}" -H "Authorization: ${request.headers.authorization}"

# Windows
$headers = @{
  "Authorization" = "${request.headers.authorization}"
}
$response = Invoke-WebRequest -Uri "${url}" -Headers $headers -Method ${method}
$response.Content    
`
      );
      // console.log(">>>", config);
    }
  }
};
