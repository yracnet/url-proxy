# URL-Proxy Documentation

## Overview

URL-Proxy is a simple proxy server designed to forward requests to a specified target URL. The server runs on port 2000 and allows you to create proxy URLs with a specific format.

## Server Configuration

- **Port:** 2000

## Proxy URL Format

To create a proxy URL, follow the specified format:

```
http://localhost:2000/proxy/[domain]/[...url]
```

- **Domain:** The target server's domain and port (e.g., my-server:8080).
- **URL:** The path to the resources on the target server, including any query parameters.

## Example

Suppose the target URL is:

```
http://my-server:8080/path/to/resources?q=1
```

The corresponding proxy URL would be:

```
http://localhost:2000/proxy/my-server:8080/path/to/resources?q=1
```

In a simplified format:

```
http://localhost:2000/proxy/[domain=my-server:8080]/[url=path/to/resources?q=1]
```

## How to Use

1. Start the URL-Proxy server on port 2000.
2. Create a proxy URL using the specified format, replacing `[domain]` and `[url]` with the appropriate values.
3. Send requests to the generated proxy URL.

## Example Request

If you want to access the resources from the example above through the proxy, you would make a request to:

```
http://localhost:2000/proxy/my-server:8080/path/to/resources?q=1
```

## Note

Ensure that the target server allows requests from the URL-Proxy server and that any necessary CORS (Cross-Origin Resource Sharing) configurations are in place.
