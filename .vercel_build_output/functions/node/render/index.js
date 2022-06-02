var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var import_node_worker_threads, s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    import_node_worker_threads = require("node:worker_threads");
    init_install_fetch();
    globalThis.DOMException || (() => {
      const port = new import_node_worker_threads.MessageChannel().port1;
      const ab = new ArrayBuffer(0);
      try {
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        return err.constructor;
      }
    })();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base642 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base642 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base642 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers2(headers.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_net.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url.host)) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https.default : import_node_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_node_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL, options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream.pipeline)(response_, new import_node_stream.PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createGunzip(zlibOptions), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream.pipeline)(response_, new import_node_stream.PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? (0, import_node_stream.pipeline)(body, import_node_zlib.default.createInflate(), reject) : (0, import_node_stream.pipeline)(body, import_node_zlib.default.createInflateRaw(), reject);
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createBrotliDecompress(), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
function installFetch() {
  Object.defineProperties(globalThis, {
    fetch: {
      enumerable: true,
      configurable: true,
      value: fetch2
    },
    Response: {
      enumerable: true,
      configurable: true,
      value: Response2
    },
    Request: {
      enumerable: true,
      configurable: true,
      value: Request2
    },
    Headers: {
      enumerable: true,
      configurable: true,
      value: Headers2
    }
  });
}
var import_node_http, import_node_https, import_node_zlib, import_node_stream, import_node_util, import_node_url, import_net, commonjsGlobal, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _Blob, Blob2, Blob$1, _File, File, t, i, h, r, m, f2, e, x, FormData, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers2, redirectStatus, isRedirect, INTERNALS$1, Response2, getSearch, ReferrerPolicy, DEFAULT_REFERRER_POLICY, INTERNALS, isRequest, Request2, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    import_node_http = __toESM(require("node:http"), 1);
    import_node_https = __toESM(require("node:https"), 1);
    import_node_zlib = __toESM(require("node:zlib"), 1);
    import_node_stream = __toESM(require("node:stream"), 1);
    import_node_util = require("node:util");
    import_node_url = require("node:url");
    import_net = require("net");
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    ponyfill_es2018 = { exports: {} };
    (function(module2, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop4() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop4;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask = (() => {
          const globalQueueMicrotask = globals && globals.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i2 !== elements.length || node._next !== void 0) {
              if (i2 === elements.length) {
                node = node._next;
                elements = node._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v) {
          return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context) {
          if (!isObject(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
          }
        }
        function assertRequiredField(x2, field, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "closed") {
            readRequest._closeSteps();
          } else if (stream._state === "errored") {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== "number") {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry7 = this._queue.shift();
              this._queueTotalSize -= entry7.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry7.buffer, entry7.byteOffset, entry7.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
          let done = false;
          if (stream._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "errored") {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = "writable";
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a;
          if (stream._state === "closed" || stream._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (writer !== void 0 && stream._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error2) {
          const state = stream._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream, error2);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = "erroring";
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = "errored";
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          });
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error2) {
          stream._inFlightWriteRequest._reject(error2);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === "erroring") {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = "closed";
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error2) {
          stream._inFlightCloseRequest._reject(error2);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error2);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream, "First parameter");
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream._state;
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error2);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || "";
            this.name = name || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop4);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === "errored") {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options, context) {
          assertDictionary(options, context);
          const mode = options === null || options === void 0 ? void 0 : options.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options, context) {
          assertDictionary(options, context);
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options, context) {
          assertDictionary(options, context);
          const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
          const signal = options === null || options === void 0 ? void 0 : options.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context) {
          assertDictionary(pair, context);
          const readable2 = pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable2, "readable", "ReadableWritablePair");
          assertReadableStream(readable2, `${context} has member 'readable' that`);
          const writable3 = pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable3, "writable", "ReadableWritablePair");
          assertWritableStream(writable3, `${context} has member 'writable' that`);
          return { readable: readable2, writable: writable3 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options = convertReaderOptions(rawOptions, "First parameter");
            if (options.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
              options = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream2.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = "readable";
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop4);
        }
        function ReadableStreamClose(stream) {
          stream._state = "closed";
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = "errored";
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class ByteLengthQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class CountQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "CountQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name) {
          return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable3 = stream._writable;
              const state = writable3._state;
              if (state === "erroring") {
                throw writable3._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable2 = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable2._state === "errored") {
              throw readable2._storedError;
            }
            ReadableStreamDefaultControllerClose(readable2._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream, r2);
            throw readable2._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name) {
          return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("node:process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("node:stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob3 } = require("buffer");
      if (Blob3 && !Blob3.prototype.stream) {
        Blob3.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error2) {
    }
    POOL_SIZE = 65536;
    _Blob = class Blob {
      #parts = [];
      #type = "";
      #size = 0;
      constructor(blobParts = [], options = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder2 = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob) {
            part = element;
          } else {
            part = encoder2.encode(element);
          }
          this.#size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
          this.#parts.push(part);
        }
        const type = options.type === void 0 ? "" : String(options.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      get size() {
        return this.#size;
      }
      get type() {
        return this.#type;
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(this.#parts, false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(this.#parts, true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob2 = _Blob;
    Blob$1 = Blob2;
    _File = class File2 extends Blob$1 {
      #lastModified = 0;
      #name = "";
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
    };
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = class FormData2 {
      #d = [];
      constructor(...a) {
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        this.#d.push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        this.#d = this.#d.filter(([b]) => b !== a);
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = this.#d, l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        this.#d.forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return this.#d.some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        this.#d.forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        this.#d = b;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    };
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (import_node_util.types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream.default)
          ;
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = Buffer.from(String(body));
        }
        let stream = body;
        if (Buffer.isBuffer(body)) {
          stream = import_node_stream.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream.default.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream.default) {
          body.on("error", (error_) => {
            const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream.PassThrough({ highWaterMark });
        p2 = new import_node_stream.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || import_node_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof import_node_http.default.validateHeaderName === "function" ? import_node_http.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error2;
      }
    };
    validateHeaderValue = typeof import_node_http.default.validateHeaderValue === "function" ? import_node_http.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
        throw error2;
      }
    };
    Headers2 = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers2) {
          const raw = init2.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init2 == null)
          ;
        else if (typeof init2 === "object" && !import_node_util.types.isBoxedPrimitive(init2)) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init2].map((pair) => {
              if (typeof pair !== "object" || import_node_util.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key2) => {
          result[key2] = this.getAll(key2);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key2) => {
          const values = this.getAll(key2);
          if (key2 === "host") {
            result[key2] = values[0];
          } else {
            result[key2] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers2.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response2 = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers2(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response2(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response2(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response2(null, { status: 0, statusText: "" });
        response[INTERNALS$1].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    ReferrerPolicy = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request2 = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentails.`);
        }
        let method = init2.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init2.size || input.size || 0
        });
        const headers = new Headers2(init2.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init2) {
          signal = init2.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init2.referrer == null ? input.referrer : init2.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
        this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init2.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_node_url.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request2(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers2(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = "no-referrer";
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
  }
});

// .svelte-kit/output/server/chunks/index-0ebd485b.js
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function each(items, fn) {
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css12) => css12.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape_attribute_value(value.toString())}"`;
  return ` ${name}${assignment}`;
}
var current_component, escaped, missing_component, on_destroy;
var init_index_0ebd485b = __esm({
  ".svelte-kit/output/server/chunks/index-0ebd485b.js"() {
    Promise.resolve();
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/hooks-1c45ba0b.js
var hooks_1c45ba0b_exports = {};
var init_hooks_1c45ba0b = __esm({
  ".svelte-kit/output/server/chunks/hooks-1c45ba0b.js"() {
  }
});

// .svelte-kit/output/server/chunks/utils-67530605.js
function daySection() {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 21 || hour < 6)
    return "night";
  return "day";
}
function normalizedCondition(condition2) {
  const c = condition2.toLowerCase();
  if (c.includes("rain") || c.includes("shower") || c.includes("drizzle"))
    return "rain";
  if (c.includes("thunder"))
    return "thunder";
  if (c.includes("cloud") || c.includes("cloudy") || c.includes("overcast") || c.includes("mist") || c.includes("fog"))
    return "cloud";
  if (c.includes("snow") || c.includes("blizzard") || c.includes("sleet") || c.includes("pellet") || c.includes("ice"))
    return "snow";
  return "sunny";
}
function getHoursData(day) {
  const hours = [];
  day.hour.forEach((h2) => {
    hours.push({
      temp: {
        fahrenheit: h2.temp_f,
        celsius: h2.temp_c
      },
      condition: h2.condition.text,
      icon: h2.condition.icon,
      wind: {
        speed: {
          mph: h2.wind_mph,
          kph: h2.wind_kph
        },
        direction: h2.wind_dir
      },
      humidity: h2.humidity,
      feelslike: {
        fahrenheit: h2.feelslike_f,
        celsius: h2.feelslike_c
      }
    });
  });
  return hours;
}
function getForecastData(days) {
  const forecast = [];
  days.forEach((day) => {
    forecast.push({
      date: day.date,
      hour: getHoursData(day)
    });
  });
  return forecast;
}
async function getWeatherFrom(city) {
  const FORECAST_URL = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=5`;
  const req = await fetch(FORECAST_URL, {
    headers: {
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      "x-rapidapi-key": "5c893bec38msh12ab05cc8f6121fp11d64ejsn294a1e6ac98d"
    }
  });
  if (!req.ok)
    return null;
  const { location, forecast } = await req.json();
  const { forecastday } = forecast;
  const data = {
    location: {
      city: location.name,
      region: location.region,
      country: location.country
    },
    forecast: getForecastData(forecastday)
  };
  return data;
}
var init_utils_67530605 = __esm({
  ".svelte-kit/output/server/chunks/utils-67530605.js"() {
  }
});

// .svelte-kit/output/server/chunks/stores-a7955130.js
function writable2(value, start = noop2) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue2.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue2.length; i2 += 2) {
            subscriber_queue2[i2][0](subscriber_queue2[i2 + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var browser, subscriber_queue2, defaultSettings, storedSettings, UserSettings, navVisible, condition, selectedHour;
var init_stores_a7955130 = __esm({
  ".svelte-kit/output/server/chunks/stores-a7955130.js"() {
    init_index_0ebd485b();
    browser = false;
    subscriber_queue2 = [];
    defaultSettings = {
      temperature: "celsius",
      distance: "metric",
      city: null
    };
    storedSettings = browser;
    UserSettings = writable2(JSON.parse(storedSettings) || defaultSettings);
    UserSettings.subscribe((val) => browser);
    navVisible = writable2(false);
    condition = writable2("");
    selectedHour = writable2(new Date().getHours());
  }
});

// .svelte-kit/output/server/entries/pages/__layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout
});
var css$4, Nav, css$3, Rain, css$2, Thunder, css$1, Background, css, _layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__layout.svelte.js"() {
    init_index_0ebd485b();
    init_utils_67530605();
    init_stores_a7955130();
    css$4 = {
      code: "nav.svelte-1yl7thz.svelte-1yl7thz{position:absolute;inset:auto 20px 20px 20px;height:80px;background:rgba(255, 255, 255, 0.2);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-radius:1.5rem;z-index:9}ul.svelte-1yl7thz li.svelte-1yl7thz{width:33.3333333333%}ul.svelte-1yl7thz li a.svelte-1yl7thz{color:#fff}ul.svelte-1yl7thz li a img.svelte-1yl7thz{-o-object-fit:contain;object-fit:contain;padding:30px}",
      map: null
    };
    Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const routes = [
        { href: "/", alt: "Home", src: "/home.svg" },
        {
          href: "/search",
          alt: "Search",
          src: "/search.svg"
        },
        {
          href: "/settings",
          alt: "Settings",
          src: "/settings.svg"
        }
      ];
      $$result.css.add(css$4);
      return `<nav class="${"row svelte-1yl7thz"}"><ul class="${"row jcenter fill svelte-1yl7thz"}">${each(routes, ({ href, alt, src }) => {
        return `<li class="${"row fcenter yfill svelte-1yl7thz"}"><a class="${"fill svelte-1yl7thz"}"${add_attribute("href", href, 0)}><img class="${"fill svelte-1yl7thz"}"${add_attribute("src", src, 0)}${add_attribute("alt", alt, 0)}></a>
			</li>`;
      })}</ul>
</nav>`;
    });
    css$3 = {
      code: ".rain__drop.svelte-1u25o4t.svelte-1u25o4t{-webkit-animation-delay:calc(var(--d) * 1s);animation-delay:calc(var(--d) * 1s);-webkit-animation-duration:calc(var(--a) * 1s);animation-duration:calc(var(--a) * 1s);-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-name:svelte-1u25o4t-drop;animation-name:svelte-1u25o4t-drop;-webkit-animation-timing-function:linear;animation-timing-function:linear;height:30px;left:calc(var(--x) * 1%);position:absolute;top:calc((var(--y) + 50) * -1px)}.rain__drop.svelte-1u25o4t path.svelte-1u25o4t{fill:#a1c6cc;opacity:var(--o);transform:scaleY(calc(var(--s) * 1.5))}@-webkit-keyframes svelte-1u25o4t-drop{90%{opacity:1}100%{opacity:0;transform:translateY(100vh)}}@keyframes svelte-1u25o4t-drop{90%{opacity:1}100%{opacity:0;transform:translateY(100vh)}}",
      map: null
    };
    Rain = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$3);
      return `<div class="${"rain"}"><svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 61; --y: 89; --o: 0.6178717494524335; --a: 1.2678621694143124; --d: 0.9249507606534522; --s: 0.2647176316000177"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 37; --y: 57; --o: 0.3887643293915215; --a: 1.1832124436355043; --d: 0.5734469928133454; --s: 0.7268698055225185"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 23; --y: 9; --o: 0.12623644061644868; --a: 1.374355542720411; --d: -0.7473576368570103; --s: 0.9665571492867262"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 48; --y: 70; --o: 0.5799564547075136; --a: 1.0699146644941642; --d: -0.21765914396985497; --s: 0.8459576579453414"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 58; --y: 56; --o: 0.03091585676524966; --a: 1.002339373457124; --d: 0.19649126970639275; --s: 0.9018108841900063"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 80; --y: 59; --o: 0.12821012318040292; --a: 0.6201828301903651; --d: 0.349495309093776; --s: 0.39611218456375363"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 11; --y: 93; --o: 0.4719671701385115; --a: 1.4211993678655868; --d: -0.7584873308341389; --s: 0.4160618333719872"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 95; --y: 41; --o: 0.552459964307741; --a: 1.1940367622829526; --d: -0.45651186134099664; --s: 0.9198013689692772"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 66; --y: 78; --o: 0.4298768104223334; --a: 0.7928138880768496; --d: -0.23460095654725244; --s: 0.0837465815661651"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 73; --y: 0; --o: 0.89360169993011; --a: 1.2426543663975564; --d: -0.23960179506282175; --s: 0.14465737075453355"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 94; --y: 35; --o: 0.07937797836637372; --a: 0.7666908551466105; --d: 0.7559284426594681; --s: 0.5307417080502665"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 60; --y: 44; --o: 0.04209278538254835; --a: 1.2256140421276838; --d: -0.12187510413974101; --s: 0.8459149679005471"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 82; --y: 44; --o: 0.05589219103563359; --a: 1.0485477375935386; --d: 0.8095801822037068; --s: 0.13042977949612844"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 72; --y: 30; --o: 0.47095365003772205; --a: 1.099550209723905; --d: 0.9565158146546171; --s: 0.2318803483207177"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 56; --y: 13; --o: 0.38398752436414396; --a: 0.6370821461565459; --d: -0.06561846401334526; --s: 0.8794366967284304"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 92; --y: 55; --o: 0.009453581633549701; --a: 1.4336218096317046; --d: -0.3783334167932; --s: 0.285239209228479"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 8; --y: 10; --o: 0.625807486012522; --a: 1.0116027858367331; --d: -0.7462840055037474; --s: 0.5019658962285509"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 99; --y: 45; --o: 0.41249655211247194; --a: 0.5058579577713902; --d: -0.5767559122382524; --s: 0.38223592496269654"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 91; --y: 23; --o: 0.5583759985122809; --a: 1.1091371992106431; --d: 0.168560386237818; --s: 0.17863132238885293"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 7; --y: 46; --o: 0.1428474527379351; --a: 1.280784083171378; --d: -0.3547461760206647; --s: 0.4460294131866589"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 48; --y: 56; --o: 0.5757262110600085; --a: 0.9440314113145025; --d: -0.2617214969346464; --s: 0.62842660941298"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 46; --y: 76; --o: 0.3745790619224749; --a: 1.1331093605578744; --d: 0.44510084861559474; --s: 0.3196187369628747"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 96; --y: 34; --o: 0.957728186667367; --a: 0.8930822343105256; --d: 0.3848784275446593; --s: 0.39287515796904726"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 93; --y: 76; --o: 0.7172121540011336; --a: 0.7185174544986297; --d: -0.9779075358807101; --s: 0.8570704377703091"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 79; --y: 58; --o: 0.04249171377201266; --a: 0.9744431851809157; --d: -0.945233713285996; --s: 0.11892418564526142"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 99; --y: 26; --o: 0.5953718585719479; --a: 0.7515118852036284; --d: 0.6087894643638272; --s: 0.1362135034603449"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 79; --y: 27; --o: 0.5900235290352991; --a: 0.9583344047072522; --d: 0.9377072102800592; --s: 0.8514810002693824"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 67; --y: 67; --o: 0.9436558439178859; --a: 0.9409294338519685; --d: -0.463188940870785; --s: 0.0490682389815873"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 27; --y: 83; --o: 0.7744038501984549; --a: 0.6323075524134616; --d: -0.6460319061912312; --s: 0.921440232289999"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 83; --y: 11; --o: 0.10050533060949429; --a: 1.099895670423445; --d: -0.6374951169755727; --s: 0.8566607743160353"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 24; --y: 80; --o: 0.13487754100309202; --a: 1.0975243395680192; --d: 0.5128835400918295; --s: 0.7388055196261638"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 85; --y: 84; --o: 0.5728846843286637; --a: 0.5282286952293203; --d: -0.7347243536290287; --s: 0.9809863408673558"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 30; --y: 36; --o: 0.4066925614432553; --a: 0.9778695478855997; --d: -0.7069000678132338; --s: 0.04280904919917616"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 66; --y: 80; --o: 0.5931531125506599; --a: 1.4163354263719523; --d: 0.7389921283879821; --s: 0.5237224931207254"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 65; --y: 46; --o: 0.9590506723871037; --a: 1.0150601872127525; --d: 0.21809814656530468; --s: 0.7051840632750748"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 52; --y: 72; --o: 0.16808570452273264; --a: 1.3637789855595077; --d: -0.5668502437538896; --s: 0.6750618547689746"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 59; --y: 37; --o: 0.7741423916258605; --a: 0.8758106198105324; --d: 0.8990984755176656; --s: 0.09953028445704515"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 54; --y: 16; --o: 0.4928771100896805; --a: 0.6629317386797076; --d: -0.16791719468416533; --s: 0.5853920983649108"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 41; --y: 91; --o: 0.006685436939815936; --a: 1.1572542493141067; --d: 0.0507209743723398; --s: 0.8428858490526356"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 8; --y: 50; --o: 0.6002301044133969; --a: 1.318656181171923; --d: -0.8632890346770088; --s: 0.9202664100925588"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 14; --y: 59; --o: 0.07640381844816191; --a: 1.0097092429657166; --d: -0.7397502206844004; --s: 0.04365845402743451"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 38; --y: 32; --o: 0.6157500353350074; --a: 0.7202702716480442; --d: 0.2640991248634963; --s: 0.520288480730053"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 91; --y: 8; --o: 0.3372672389790179; --a: 0.7343419161882141; --d: -0.8484524499538182; --s: 0.6696707624789955"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 21; --y: 9; --o: 0.6149285719412325; --a: 1.1207946636260244; --d: 0.7484960223415134; --s: 0.43068709195986377"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 46; --y: 76; --o: 0.5163076157948392; --a: 0.8730520122348229; --d: -0.04773673200081685; --s: 0.19166339535761123"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 76; --y: 31; --o: 0.40930843082241175; --a: 1.290687674606627; --d: 0.3391301723099982; --s: 0.6589179978126849"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 31; --y: 9; --o: 0.6322648420027328; --a: 0.9950451585161602; --d: 0.015983668552327135; --s: 0.771968629762833"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 35; --y: 99; --o: 0.9051404312130844; --a: 1.1686645385796748; --d: -0.21366306372408683; --s: 0.5540435623234032"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 11; --y: 94; --o: 0.36258634240281196; --a: 1.1434338137638005; --d: -0.06223785841378904; --s: 0.10866782412866516"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 48; --y: 61; --o: 0.7247468643281647; --a: 1.14795857741696; --d: -0.6418311133095957; --s: 0.7149319943226475"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 8; --y: 95; --o: 0.9909068481433387; --a: 1.4907795135052848; --d: -0.9622657253791846; --s: 0.6543817962268568"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 61; --y: 87; --o: 0.44112827736284066; --a: 1.1360707346149894; --d: 0.5786226020733163; --s: 0.4366049799148928"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 14; --y: 15; --o: 0.474980527569115; --a: 1.3788089385090367; --d: 0.39926884476794244; --s: 0.12794034536378485"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 73; --y: 49; --o: 0.12557064234802917; --a: 1.411072339737573; --d: -0.27155480893007367; --s: 0.06880565249023429"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 35; --y: 50; --o: 0.7028937825748514; --a: 0.7133984589128963; --d: 0.643905482468381; --s: 0.9881229513555692"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 10; --y: 44; --o: 0.14649847892810164; --a: 1.0668253619826278; --d: 0.21794395101584207; --s: 0.0360677259838591"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 61; --y: 90; --o: 0.8529581650320299; --a: 0.6761828807202517; --d: -0.9159314655567075; --s: 0.6019699265056269"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 69; --y: 87; --o: 0.6904976210094367; --a: 0.8112789542993664; --d: -0.23209867148623609; --s: 0.8617154292225737"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 13; --y: 73; --o: 0.6171890528672033; --a: 0.6252371097826745; --d: -0.05342965652027232; --s: 0.8449327356266993"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 79; --y: 35; --o: 0.8749704701932872; --a: 1.0778203115013327; --d: -0.34019777886589075; --s: 0.8597873577437833"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 67; --y: 39; --o: 0.44772466835086; --a: 0.6973288232323458; --d: 0.3349847597813618; --s: 0.8210740435557047"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 18; --y: 70; --o: 0.3364624744023983; --a: 1.391830447687146; --d: 0.689658740693663; --s: 0.9170735882598198"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 73; --y: 52; --o: 0.8266987698817838; --a: 1.1966309417178893; --d: 0.4576818601981567; --s: 0.8439862508317444"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 57; --y: 61; --o: 0.6404230497076042; --a: 1.4697368541044695; --d: -0.14614219314005172; --s: 0.5784673695991411"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 34; --y: 41; --o: 0.26576167056894917; --a: 1.2266089415184471; --d: 0.7596366695953347; --s: 0.5051493469683734"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 76; --y: 4; --o: 0.5406608905810708; --a: 1.3633290960762163; --d: 0.5166050394030406; --s: 0.9338794873065823"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 18; --y: 77; --o: 0.049004185835686886; --a: 0.8083748255609187; --d: -0.8624777012724496; --s: 0.6775948936647749"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 5; --y: 29; --o: 0.36202909004736994; --a: 1.2916364493622154; --d: 0.7380362231739945; --s: 0.6552444339636458"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 6; --y: 3; --o: 0.009027125595613805; --a: 1.32146213657105; --d: -0.79582147845167; --s: 0.7297673759671777"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 20; --y: 65; --o: 0.6677352449152318; --a: 1.3962998277560288; --d: 0.13662668969314318; --s: 0.4288380266069849"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 46; --y: 23; --o: 0.6415712750494971; --a: 0.9653553886974049; --d: 0.13259941702894285; --s: 0.40426820546951747"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 96; --y: 23; --o: 0.03503736994408624; --a: 1.2586092904855477; --d: 0.48625432415411485; --s: 0.055446081896972865"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 81; --y: 63; --o: 0.45598840939492047; --a: 0.8381809608720614; --d: -0.8104669503732045; --s: 0.542799921774201"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 46; --y: 80; --o: 0.7852540610689842; --a: 0.7359741013360053; --d: 0.3668187517803929; --s: 0.954303312505256"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 82; --y: 53; --o: 0.547780849067385; --a: 1.252859683985321; --d: 0.45706819557073697; --s: 0.5275214897442642"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 79; --y: 75; --o: 0.5108819657664543; --a: 0.60797433328087; --d: 0.34764557059303725; --s: 0.8670403259704058"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 11; --y: 43; --o: 0.4331493514384481; --a: 1.1073845153716104; --d: -0.13156661883197085; --s: 0.7961254416073038"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 10; --y: 23; --o: 0.6836176557588987; --a: 0.7243631683227858; --d: -0.4075970968774989; --s: 0.03539615669347507"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 10; --y: 46; --o: 0.9671673304600226; --a: 0.5783371427252775; --d: 0.4776285576781363; --s: 0.646155124656056"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 74; --y: 29; --o: 0.11601411528743588; --a: 1.364626353874929; --d: 0.42460381118218615; --s: 0.7091704451255074"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 38; --y: 62; --o: 0.8774349855535053; --a: 1.11054478437229; --d: -0.1419422467885516; --s: 0.8325301579765565"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 25; --y: 71; --o: 0.6210353849797714; --a: 1.0550536703351165; --d: 0.2795259237040377; --s: 0.6890624303888286"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 10; --y: 52; --o: 0.6743841398953958; --a: 1.4330316508607432; --d: -0.038572973166273616; --s: 0.697829026466062"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 86; --y: 30; --o: 0.54982019831076; --a: 0.762992204766102; --d: 0.4829262367077263; --s: 0.9093330010246108"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 8; --y: 67; --o: 0.274430869064213; --a: 0.55760751821521; --d: 0.6375300626648248; --s: 0.07667725741862363"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 54; --y: 93; --o: 0.8023954289823567; --a: 1.3870677794116144; --d: 0.6955599705364963; --s: 0.03532567018876187"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 30; --y: 0; --o: 0.7004357565208119; --a: 1.1139676793844187; --d: -0.3172251051073509; --s: 0.1347366460680226"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 82; --y: 94; --o: 0.47042290508154716; --a: 0.8472431685247013; --d: -0.3913380080994444; --s: 0.3047074503502596"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 21; --y: 41; --o: 0.23316424062021457; --a: 1.0697247701661212; --d: -0.3922922838216105; --s: 0.6668810204882811"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 27; --y: 16; --o: 0.08145206963521567; --a: 1.438107347582036; --d: 0.28795367493193647; --s: 0.11814800405909298"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 0; --y: 24; --o: 0.8093100718969277; --a: 0.988745993133322; --d: -0.27568461138252864; --s: 0.16904354604463423"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 20; --y: 95; --o: 0.900783315482331; --a: 0.7992711511210826; --d: -0.21229462433475366; --s: 0.20903862910396587"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 94; --y: 23; --o: 0.5767794099124646; --a: 0.8525921054746264; --d: -0.6814606477231502; --s: 0.07599298746734195"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 39; --y: 4; --o: 0.4812437382972281; --a: 0.5641375069009027; --d: -0.5123442810065639; --s: 0.799073205592838"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 55; --y: 29; --o: 0.6676465761678767; --a: 0.9174152075625468; --d: -0.861242575614733; --s: 0.13949088411190402"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 13; --y: 34; --o: 0.5756103493551448; --a: 0.9999562167210783; --d: 0.8208406024756711; --s: 0.8078264408424225"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 43; --y: 63; --o: 0.35704393283546354; --a: 0.8012494687426597; --d: 0.7005950955955162; --s: 0.3158691844131529"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 55; --y: 56; --o: 0.5770080750347581; --a: 0.7326637768731687; --d: 0.5843013254457463; --s: 0.679066581918154"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 84; --y: 3; --o: 0.4372169604203968; --a: 0.6929715084932724; --d: -0.6854289855979743; --s: 0.9195895131259932"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 65; --y: 41; --o: 0.9478861376098839; --a: 1.1817100295047256; --d: -0.12384148310959464; --s: 0.2447424978134103"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 50; --y: 72; --o: 0.41783837294337056; --a: 1.493248007362658; --d: 0.6531596846471368; --s: 0.6587061311581479"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 93; --y: 82; --o: 0.6050704303267589; --a: 0.6036162761079205; --d: 0.6620179013052256; --s: 0.07771943410367466"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 54; --y: 88; --o: 0.03386919276303546; --a: 1.1254015315914778; --d: 0.24659948714975544; --s: 0.4948944157144666"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 22; --y: 13; --o: 0.0076986665595197845; --a: 0.8978702161224634; --d: 0.12153361334644863; --s: 0.4774841742631213"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 56; --y: 33; --o: 0.3620314115706189; --a: 1.4853519145508156; --d: -0.7879453340616198; --s: 0.6032842980134476"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 31; --y: 57; --o: 0.6314919456788226; --a: 0.8003026835536948; --d: 0.027739628004728623; --s: 0.7119346229253924"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 33; --y: 23; --o: 0.4140261444041671; --a: 0.998456498863707; --d: -0.8270704743708355; --s: 0.2052462534982611"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 35; --y: 86; --o: 0.1770577033958689; --a: 0.9484729179990454; --d: -0.6169406337848877; --s: 0.9214924164730673"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 40; --y: 48; --o: 0.7114172738632016; --a: 0.8537888009569949; --d: 0.3009842131587934; --s: 0.7045456507660575"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 26; --y: 10; --o: 0.8746295571509783; --a: 0.5041451169786666; --d: 0.7552400215200454; --s: 0.7950792509040188"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 83; --y: 46; --o: 0.6167619510129183; --a: 1.335562497032524; --d: 0.655970003417778; --s: 0.9679963522924564"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 9; --y: 26; --o: 0.5808851490675517; --a: 1.327961685879102; --d: 0.8942560453123094; --s: 0.5013143577771533"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 14; --y: 3; --o: 0.490926065290916; --a: 1.4949656177281738; --d: 0.5003026156443653; --s: 0.276152785893075"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 1; --y: 64; --o: 0.8513844579755572; --a: 1.4845489867482855; --d: 0.3492006150108029; --s: 0.4345557985486159"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 33; --y: 45; --o: 0.40898624722102594; --a: 1.249740557813359; --d: 0.5943360583003479; --s: 0.3818519200376511"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 6; --y: 61; --o: 0.15512033304480144; --a: 1.0401797521045038; --d: 0.2579684378343634; --s: 0.9844654608930081"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 83; --y: 55; --o: 0.3251730244933355; --a: 0.8309581926543461; --d: 0.5215538137231572; --s: 0.04903246988282284"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 5; --y: 91; --o: 0.3516783411310582; --a: 1.0921262672361607; --d: -0.41452657488598543; --s: 0.7102603207871225"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 72; --y: 7; --o: 0.5181862322790387; --a: 1.3533727287092718; --d: 0.6391173742006018; --s: 0.8423173260419348"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 43; --y: 1; --o: 0.20690921279324104; --a: 1.482598400024712; --d: -0.7723975607008642; --s: 0.8453929716531339"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 80; --y: 11; --o: 0.0018557089209836342; --a: 1.4795700184841782; --d: 0.4400449422523356; --s: 0.2871385864413456"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 62; --y: 7; --o: 0.9192188203019962; --a: 1.2453645800758533; --d: 0.6603978881834651; --s: 0.6727033585223203"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 34; --y: 12; --o: 0.6119809020691664; --a: 1.2186019474457794; --d: -0.2986301308451016; --s: 0.23202679554808237"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 54; --y: 52; --o: 0.11103845415150992; --a: 1.0616210797510282; --d: 0.558131535406365; --s: 0.5938935059821182"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 13; --y: 42; --o: 0.9056228019061823; --a: 1.2171606102848975; --d: -0.3888463690115729; --s: 0.23579868950888994"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 57; --y: 13; --o: 0.621088407248299; --a: 1.031372572249367; --d: -0.22331298364634478; --s: 0.7875580950629868"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 28; --y: 93; --o: 0.615401165937953; --a: 0.5868272164808606; --d: -0.8481231697357101; --s: 0.103423490747512"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 57; --y: 78; --o: 0.034230897733507515; --a: 1.475044689905171; --d: -0.6304271537172021; --s: 0.6874170867528551"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 98; --y: 17; --o: 0.9963340948365667; --a: 1.0092032333225773; --d: -0.6104819061606452; --s: 0.7199026401127488"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 53; --y: 28; --o: 0.07565841996173495; --a: 1.4448875984382112; --d: -0.0013895952998743688; --s: 0.6396012518289296"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 87; --y: 66; --o: 0.5725879498576547; --a: 1.1867500044402342; --d: 0.20140281749003908; --s: 0.07711936799622543"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 45; --y: 4; --o: 0.6593196170243711; --a: 0.9305108538607574; --d: -0.8583584233494581; --s: 0.8927462811689182"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 20; --y: 26; --o: 0.3821994175964514; --a: 0.739442005607361; --d: 0.9715689725988037; --s: 0.29817218206368645"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 83; --y: 18; --o: 0.00634049083551691; --a: 0.524756219037187; --d: 0.8296160530051622; --s: 0.9369937198790959"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 69; --y: 42; --o: 0.6281133285777725; --a: 0.6325020705957585; --d: -0.3009434115474501; --s: 0.6123444905164204"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 62; --y: 79; --o: 0.5452993994900963; --a: 0.560729418226352; --d: -0.6685472293829373; --s: 0.00048782209540454424"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 80; --y: 67; --o: 0.8885963570785735; --a: 1.340669702953771; --d: -0.5338656754193463; --s: 0.6617492763116095"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 7; --y: 58; --o: 0.33323309623343467; --a: 0.8825678390493796; --d: -0.8084499424818299; --s: 0.8945989145123758"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 9; --y: 89; --o: 0.17405340904511446; --a: 1.194346364909507; --d: -0.2723518009963706; --s: 0.5640953167090281"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 15; --y: 88; --o: 0.8834790178632808; --a: 0.6467585738552841; --d: -0.9597848033301903; --s: 0.4560066852881677"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 4; --y: 60; --o: 0.2192954635536446; --a: 1.1983324365821053; --d: -0.8834437094146614; --s: 0.8429768587879061"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 42; --y: 65; --o: 0.07764135294043828; --a: 0.64112443487699; --d: 0.6653153625443435; --s: 0.560387789497985"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 96; --y: 98; --o: 0.4467195839886908; --a: 1.2339324009683748; --d: 0.5632901207110366; --s: 0.4380470532214078"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 27; --y: 47; --o: 0.19065321194992557; --a: 1.0050844891138775; --d: -0.8191278812988667; --s: 0.07566195968906353"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 95; --y: 5; --o: 0.49872547514392607; --a: 0.9531002054557134; --d: 0.5608696449509782; --s: 0.0496631527822784"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 63; --y: 97; --o: 0.19397645073985537; --a: 1.4372979574664109; --d: -0.6525955328929398; --s: 0.37502010330408897"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 72; --y: 66; --o: 0.8231929252861425; --a: 1.218719459636082; --d: -0.760209444966728; --s: 0.4324016310220049"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 33; --y: 11; --o: 0.42505063385325137; --a: 0.5889263630159187; --d: 0.8792625764342374; --s: 0.37576669756164294"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 26; --y: 61; --o: 0.7621539968648501; --a: 0.8710333112249082; --d: -0.9594727223022823; --s: 0.5336975615160438"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 50; --y: 58; --o: 0.791236026875078; --a: 1.3085940557058688; --d: -0.9367582671467227; --s: 0.9158382627288753"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 64; --y: 30; --o: 0.1286004530574334; --a: 1.3128014499644074; --d: -0.06191455487209385; --s: 0.24014897154641335"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 10; --y: 92; --o: 0.572224424879034; --a: 1.4990547328684918; --d: 0.189019908716471; --s: 0.0757861680272911"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 45; --y: 45; --o: 0.02250468911650816; --a: 0.6299747634794366; --d: 0.9938642640562891; --s: 0.4223854180052873"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 46; --y: 52; --o: 0.6377578158833022; --a: 1.4089798697485998; --d: 0.4279577705948867; --s: 0.8786291771544799"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 21; --y: 95; --o: 0.2956008361456135; --a: 0.9604413259981541; --d: 0.8179056260350142; --s: 0.8182782289017763"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 70; --y: 0; --o: 0.8399333221070702; --a: 1.0287043237680944; --d: 0.8134927083605574; --s: 0.8862876359383256"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 8; --y: 9; --o: 0.10742987336722454; --a: 0.7107793360396482; --d: 0.9113473545956587; --s: 0.9390179147917421"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 63; --y: 42; --o: 0.4843314533120493; --a: 0.6534604066166887; --d: 0.6796089506580114; --s: 0.7950265678571775"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 1; --y: 18; --o: 0.7214264358560141; --a: 1.0591421247618875; --d: -0.891866629609062; --s: 0.3537264878272064"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 50; --y: 1; --o: 0.1378107029113349; --a: 0.6652054684392179; --d: -0.3121816357342757; --s: 0.7515546913006341"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 88; --y: 20; --o: 0.6355276659066527; --a: 1.3216313447210974; --d: -0.06663703208383032; --s: 0.6717242071614611"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 94; --y: 62; --o: 0.8251889642298418; --a: 1.2367013625160994; --d: -0.6914142883891268; --s: 0.18285878987866422"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 80; --y: 1; --o: 0.9801051877081095; --a: 0.7122308981127823; --d: -0.20161350578907022; --s: 0.4830745662614695"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 53; --y: 74; --o: 0.7737688944706165; --a: 0.6684428837495158; --d: -0.2798326749884459; --s: 0.6102636954954448"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 88; --y: 59; --o: 0.9566280250606116; --a: 0.6978534840377775; --d: 0.3056033564406033; --s: 0.7258012501821638"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 94; --y: 83; --o: 0.9218346844641245; --a: 0.8773906670933322; --d: -0.08947277075791593; --s: 0.10600877516098195"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 19; --y: 29; --o: 0.7826223017430527; --a: 0.8609480704001937; --d: -0.8669534873002669; --s: 0.8240565804694968"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 67; --y: 26; --o: 0.7912376093321314; --a: 1.0937582329252689; --d: 0.2153579677650237; --s: 0.444871955761206"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 71; --y: 98; --o: 0.7037657465170588; --a: 1.1164166715220307; --d: 0.08929816125074908; --s: 0.4540212613534558"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 53; --y: 96; --o: 0.4458452522095626; --a: 1.0613403368646808; --d: 0.1554804876809075; --s: 0.18693199173140318"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 44; --y: 70; --o: 0.16018795017678666; --a: 1.2224331060910345; --d: -0.6945021833172667; --s: 0.7425998607371054"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 28; --y: 20; --o: 0.9754721545150142; --a: 0.8130459319853685; --d: 0.3456440024493883; --s: 0.09430836337786874"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 22; --y: 5; --o: 0.995500540235855; --a: 1.4366794963245637; --d: 0.465080181677227; --s: 0.5080003544023894"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 8; --y: 15; --o: 0.8017154922705931; --a: 1.0788839458520532; --d: -0.7469264330279755; --s: 0.3101314283878043"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 83; --y: 51; --o: 0.8968321913861514; --a: 0.8595760143224735; --d: -0.6588007042016542; --s: 0.746310685148807"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 5; --y: 91; --o: 0.26754434435460817; --a: 1.3776114348674324; --d: 0.4044876313455408; --s: 0.06160001301084295"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 1; --y: 39; --o: 0.8382205618841041; --a: 0.8489226006681556; --d: 0.9462381516111922; --s: 0.38724848787807264"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 91; --y: 36; --o: 0.6445876435841871; --a: 0.9517946890294844; --d: 0.1881531018241116; --s: 0.7956687361241861"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 16; --y: 66; --o: 0.5267261288829934; --a: 1.0187856755335505; --d: 0.8928942534366735; --s: 0.9463638685440738"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 92; --y: 56; --o: 0.9441400235350403; --a: 0.9065394441459234; --d: -0.7463670430348843; --s: 0.188269790421413"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 82; --y: 65; --o: 0.21592894318583888; --a: 1.386802965521915; --d: -0.6137989931371228; --s: 0.4104644123985475"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 40; --y: 95; --o: 0.8103207778366843; --a: 1.2432419682655504; --d: -0.9948936835157856; --s: 0.771756110457946"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 29; --y: 75; --o: 0.848509707709018; --a: 1.0032538890325917; --d: -0.40592739925910726; --s: 0.6543964647449747"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 21; --y: 55; --o: 0.97686961437108; --a: 1.465343893539633; --d: -0.963889351421483; --s: 0.8291046805676139"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 53; --y: 31; --o: 0.16877757877430732; --a: 1.106704339431897; --d: -0.7860968904404135; --s: 0.43600260451109785"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 36; --y: 58; --o: 0.7889845372528859; --a: 0.5446309251963966; --d: -0.5719406713149335; --s: 0.3691598638671916"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 95; --y: 7; --o: 0.33831854966944497; --a: 0.8401984066202035; --d: 0.5507199242375704; --s: 0.37611126207474954"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 64; --y: 59; --o: 0.8580508118825017; --a: 0.7045497254206676; --d: -0.9370939955358168; --s: 0.5866127808045316"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 23; --y: 1; --o: 0.7738194463810057; --a: 1.1461954572266393; --d: -0.3674165722464866; --s: 0.05247509152483709"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 56; --y: 36; --o: 0.4532596644849436; --a: 1.121205175830927; --d: -0.29568560313392034; --s: 0.8784240660055556"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 64; --y: 29; --o: 0.3543668636906898; --a: 0.908796604996706; --d: 0.11420076765020237; --s: 0.4309744278086898"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 35; --y: 51; --o: 0.4537551451535091; --a: 1.3410595603170452; --d: 0.16844253885651117; --s: 0.8180711957049303"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 9; --y: 8; --o: 0.6174382644472403; --a: 0.7186853587153463; --d: -0.45830323105597204; --s: 0.8856697753488643"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 10; --y: 93; --o: 0.175195079767819; --a: 0.8418150640252489; --d: -0.6717995839612527; --s: 0.09828810611020011"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 26; --y: 43; --o: 0.6112861252724635; --a: 1.397430543486417; --d: 0.2180916985141197; --s: 0.02464037765915461"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 92; --y: 87; --o: 0.197279482553246; --a: 0.883986435949808; --d: -0.625043035300314; --s: 0.804354489010523"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 25; --y: 80; --o: 0.39606415184846533; --a: 1.3769610269204335; --d: 0.5108149689870203; --s: 0.1779774485277752"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 7; --y: 32; --o: 0.5400125731903451; --a: 1.045020022957641; --d: -0.9131464859013669; --s: 0.14404542952254706"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 66; --y: 90; --o: 0.17145292822797287; --a: 0.8117761031162682; --d: -0.317093562925697; --s: 0.46834271371466185"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 91; --y: 0; --o: 0.3657687552221023; --a: 1.325017160986075; --d: -0.5388942457991224; --s: 0.10254537428009414"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 17; --y: 71; --o: 0.38155722421743077; --a: 0.7301863341677264; --d: 0.4193913777652134; --s: 0.7066291848423274"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 37; --y: 48; --o: 0.007732522859715152; --a: 1.015387889645949; --d: -0.9284604684116298; --s: 0.3351622666617984"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 10; --y: 90; --o: 0.7688497563911689; --a: 0.7461251109257152; --d: 0.2953520697746663; --s: 0.056254217712129906"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 99; --y: 84; --o: 0.40902463284350676; --a: 0.9040041970004868; --d: 0.4901847107371342; --s: 0.11196324484533804"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 13; --y: 78; --o: 0.020682326136801432; --a: 0.6367593927787829; --d: -0.3931874224004166; --s: 0.4447167066216653"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 22; --y: 87; --o: 0.5775330617606129; --a: 1.3177910583441048; --d: 0.04295367746211065; --s: 0.12675696068309894"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 59; --y: 29; --o: 0.6419634185414844; --a: 0.5539756875717585; --d: -0.20283894281640702; --s: 0.1605907989510993"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 31; --y: 38; --o: 0.01945509394653433; --a: 1.206922867949957; --d: -0.464261542479389; --s: 0.6040614148519887"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 61; --y: 69; --o: 0.9953233982626848; --a: 0.6846869444727814; --d: 0.7451746602734728; --s: 0.6241807266713986"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 23; --y: 32; --o: 0.3694530977143782; --a: 1.2266051428839868; --d: 0.41327841620860895; --s: 0.25119439450421077"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 46; --y: 86; --o: 0.592293886650278; --a: 1.2303166319808665; --d: -0.3943368486912129; --s: 0.3904535269919167"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 39; --y: 32; --o: 0.9127343708312268; --a: 1.3520478492228787; --d: 0.7699636977378246; --s: 0.6522937558715975"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 82; --y: 83; --o: 0.16357984297464156; --a: 0.8422938192726568; --d: -0.7650846216152289; --s: 0.6059260870931227"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 51; --y: 73; --o: 0.7624839527228255; --a: 0.5289064014078655; --d: 0.5605175531641908; --s: 0.06715593575815881"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 26; --y: 73; --o: 0.532488160164734; --a: 1.0472886227129294; --d: 0.04581034331614209; --s: 0.8391512479076868"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 18; --y: 61; --o: 0.9898925199502586; --a: 0.896083595509414; --d: 0.05690553716258773; --s: 0.5575145988625951"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 32; --y: 3; --o: 0.2968344829480136; --a: 1.1549214029233947; --d: -0.930406834240129; --s: 0.08548030007454188"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 43; --y: 96; --o: 0.7387005266340327; --a: 1.0544109074804526; --d: 0.021179603648291856; --s: 0.7969389871576231"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 59; --y: 77; --o: 0.08768907631666178; --a: 0.7202309263732527; --d: 0.1241091805900254; --s: 0.4188061788253832"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 6; --y: 49; --o: 0.7885878864119873; --a: 1.1949024232020158; --d: 0.9632586271398851; --s: 0.8883752421343529"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 81; --y: 89; --o: 0.6315853063314241; --a: 0.762548566451724; --d: -0.801552537831502; --s: 0.8131697822738302"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 67; --y: 66; --o: 0.6327771724453701; --a: 0.8825202484465509; --d: 0.21996339803020515; --s: 0.2158277977925509"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 33; --y: 18; --o: 0.24737779533371462; --a: 0.6677093682764752; --d: -0.34012621473239824; --s: 0.8223892059497244"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 40; --y: 12; --o: 0.18158688626508468; --a: 1.007668707073608; --d: 0.42248060703204526; --s: 0.9560268834966186"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 84; --y: 59; --o: 0.7273327062683146; --a: 1.4449564012593612; --d: 0.0882994538098969; --s: 0.34280945984878763"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 38; --y: 57; --o: 0.7387603882253355; --a: 0.965615790583318; --d: 0.6965546785111059; --s: 0.4967587968311451"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 46; --y: 51; --o: 0.10797976394353381; --a: 1.203602930348931; --d: 0.36293006112084125; --s: 0.6158712542430482"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 17; --y: 90; --o: 0.10514221646303112; --a: 0.6070191740944342; --d: -0.46623438050511146; --s: 0.3425731698611887"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 20; --y: 77; --o: 0.6544998085903022; --a: 1.2871135065211408; --d: 0.5298265645847886; --s: 0.6625150012761076"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 12; --y: 65; --o: 0.570665848457443; --a: 1.2714854478376807; --d: -0.2923867581266655; --s: 0.5048246524229132"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 19; --y: 37; --o: 0.2943626809866797; --a: 0.8501140233229008; --d: 0.17090261644038218; --s: 0.9541424773705804"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 66; --y: 69; --o: 0.11734736193491169; --a: 1.4046030379995396; --d: 0.8318274206513405; --s: 0.049893022122990294"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 97; --y: 90; --o: 0.5460770821865044; --a: 0.9797892679394085; --d: 0.3108359191748664; --s: 0.7551195753438413"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 50; --y: 54; --o: 0.8098462559031789; --a: 1.1320379844065172; --d: -0.10793182562217263; --s: 0.9331348226477472"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 34; --y: 55; --o: 0.9039457129684181; --a: 1.29607124678365; --d: 0.5268137304123073; --s: 0.4113677003962424"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 42; --y: 3; --o: 0.9980312127288316; --a: 1.3347984719848571; --d: 0.5030581752635608; --s: 0.40976410974537947"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 47; --y: 46; --o: 0.41884665501767016; --a: 1.2846027408575351; --d: 0.9322162463240038; --s: 0.39027790556470343"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 1; --y: 30; --o: 0.6106190490349774; --a: 1.1566929195357296; --d: 0.2169200624651073; --s: 0.6860584749239347"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 3; --y: 78; --o: 0.3163525542040826; --a: 1.066362504150602; --d: 0.6911981333690722; --s: 0.30939066768054846"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 7; --y: 5; --o: 0.4158056333865776; --a: 1.3338864675587354; --d: -0.8058665619949545; --s: 0.14045917165196276"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 19; --y: 73; --o: 0.25993916916634485; --a: 0.9504558495875981; --d: 0.8538860944917102; --s: 0.13489970405810592"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 1; --y: 50; --o: 0.6467971951305349; --a: 0.5942788406429222; --d: -0.12015562024027604; --s: 0.4608996050695111"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 20; --y: 82; --o: 0.7755505027632879; --a: 1.2248396479488508; --d: 0.13920090983457678; --s: 0.2394400933219789"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 0; --y: 84; --o: 0.3738969013409461; --a: 1.0120382361355589; --d: 0.6437442440260015; --s: 0.4246777583707695"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 62; --y: 48; --o: 0.4455266786576255; --a: 0.9082099654766314; --d: -0.020908044125853564; --s: 0.4311936904844771"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 35; --y: 15; --o: 0.7672394178831181; --a: 1.1032715407016895; --d: 0.7660347782823438; --s: 0.09372311062802874"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 73; --y: 99; --o: 0.5919664902220958; --a: 0.7823352967704251; --d: 0.5344882268920821; --s: 0.7979654373667473"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 7; --y: 8; --o: 0.16606952893147553; --a: 1.203620856331763; --d: 0.6513899096863534; --s: 0.32517006457540587"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 7; --y: 38; --o: 0.7466157439190209; --a: 1.2983125536226832; --d: 0.8497890529464631; --s: 0.9119932399547037"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
	<svg class="${"rain__drop svelte-1u25o4t"}" preserveAspectRatio="${"xMinYMin"}" viewBox="${"0 0 5 50"}" style="${"--x: 89; --y: 11; --o: 0.29675539666555717; --a: 1.1526448663149158; --d: 0.2096151022680912; --s: 0.853735912259026"}"><path stroke="${"none"}" d="${"M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"}" class="${"svelte-1u25o4t"}"></path></svg>
</div>`;
    });
    css$2 = {
      code: ".thunder.svelte-12ytuyu{--lightning:var(--sec-light);position:absolute;inset:0;background:var(--lightning);opacity:0;-webkit-animation:svelte-12ytuyu-thunderFlash 6s ease-out infinite;animation:svelte-12ytuyu-thunderFlash 6s ease-out infinite}@-webkit-keyframes svelte-12ytuyu-thunderFlash{0%{opacity:0}2%{opacity:0}3%{opacity:0.6}4%{opacity:0.2}6%{opacity:0.9}30%{opacity:0}}@keyframes svelte-12ytuyu-thunderFlash{0%{opacity:0}2%{opacity:0}3%{opacity:0.6}4%{opacity:0.2}6%{opacity:0.9}30%{opacity:0}}",
      map: null
    };
    Thunder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$2);
      return `<div class="${"thunder row fill svelte-12ytuyu"}"${add_attribute("style", daySection() === "day" ? "--lightning: lightgoldenrodyellow;" : "", 0)}></div>`;
    });
    css$1 = {
      code: ".state-bg.svelte-5mn9z6{position:absolute;inset:0;opacity:0;-webkit-animation:fadeIn 500ms ease-out;animation:fadeIn 500ms ease-out;-webkit-animation-delay:500ms;animation-delay:500ms;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.sunny.svelte-5mn9z6{background:var(--bg-sunny)}.cloud.svelte-5mn9z6{background:var(--bg-cloud)}.rain.svelte-5mn9z6{background:var(--bg-rain)}.snow.svelte-5mn9z6{background:var(--bg-snow)}.thunder.svelte-5mn9z6{background:var(--bg-thunder)}",
      map: null
    };
    Background = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let rain;
      let thunder;
      let $condition, $$unsubscribe_condition;
      $$unsubscribe_condition = subscribe(condition, (value) => $condition = value);
      $$result.css.add(css$1);
      rain = $condition === "rain" || $condition === "snow";
      thunder = $condition === "thunder";
      $$unsubscribe_condition();
      return `${rain ? `${validate_component(Rain, "Rain").$$render($$result, {}, {}, {})}

	${thunder ? `${validate_component(Thunder, "Thunder").$$render($$result, {}, {}, {})}` : ``}` : ``}

<div class="${escape($condition) + " state-bg row fill svelte-5mn9z6"}"></div>`;
    });
    css = {
      code: '*,*:before,*:after{box-sizing:border-box;margin:0;padding:0;border:none;outline:none;box-shadow:none;image-rendering:crisp-edges;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;-webkit-tap-highlight-color:transparent}:root{--pri:#51b4fe;--pri-light:#93cffe;--pri-dark:#3498fe;--sec:#fab63f;--sec-light:#fed94f;--sec-dark:#f36c29;--ter:#2a2e4c;--ter-light:#545c98;--ter-dark:#0d0f18;--grey:#ccc;--grey-light:#ddd;--grey-dark:#aaa;--bg:linear-gradient(30deg, var(--pri-dark) 0%, var(--pri-light) 75%);--bg-night:linear-gradient(30deg, var(--ter) 0%, var(--ter-dark) 75%);--bg-card:linear-gradient(30deg, rgba(42, 46, 76, 0.7) 0%, rgba(52, 152, 254, 0.5) 75%);--bg-card-active:linear-gradient(30deg, #2a2e4c 0%, #0d0f18 75%);--bg-sunny:radial-gradient(\n  	circle at top right,\n  	var(--sec) 10%,\n  	var(--sec-light) 20%,\n  	rgba(255, 255, 255, 0) 50%\n  );--bg-clear:radial-gradient(\n  	circle at top right,\n  	rgba(255, 255, 255, 0.3) 1%,\n  	rgba(255, 255, 255, 0.1) 20%,\n  	rgba(255, 255, 255, 0) 40%\n  );--bg-cloud:radial-gradient(\n  		circle at top,\n  		var(--grey-light) 5%,\n  		var(--grey) 15%,\n  		rgba(255, 255, 255, 0) 40%\n  	),\n  	radial-gradient(\n  		circle at top right,\n  		var(--grey-light) 5%,\n  		var(--grey) 15%,\n  		rgba(255, 255, 255, 0) 30%\n  	),\n  	radial-gradient(\n  		circle at top left,\n  		var(--grey-light) 5%,\n  		var(--grey) 15%,\n  		rgba(255, 255, 255, 0) 30%\n  	);--bg-rain:var(--bg-cloud);--bg-snow:var(--bg-cloud);--bg-thunder:var(--bg-cloud);--shadow:0 60px 60px -20px #545c98;--inset-shadow:inset 0 0 8px 0 #51b4fe;--glass-shadow:inset 2px 2px 2px -1px rgba(255, 255, 255, 0.5), inset -2px -2px 2px -1px #545c98;--font-pri:"Circular Std", "Segoe UI Emoji", sans-serif;--font-sec:"Operator Mono Lig", monospace;font-family:var(--font-pri)}html,body{position:relative;width:100%;height:100%;overflow:hidden}body{background:#000;color:#000}#app{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:0.5em;overflow:hidden}.scroll::-webkit-scrollbar{width:0 !important}.scroll::-webkit-scrollbar-track{background-color:#e6e6e6}.scroll::-webkit-scrollbar-thumb{background-color:skyblue}.slider{scroll-behavior:smooth;-ms-scroll-snap-type:x mandatory;scroll-snap-type:x mandatory}.slide{scroll-snap-align:start;scroll-snap-stop:always}a{text-decoration:none;color:var(--pri)}ul{list-style:none}pre,code{font-family:var(--font-sec)}.autocomplete{position:relative !important;width:100%;height:100% !important}.autocomplete .input-container{position:absolute !important;top:30px;left:30px;width:calc(100% - 60px) !important;background:rgba(255, 255, 255, 0.6);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-radius:1rem;z-index:1 !important}.autocomplete .input-container input{padding:20px 32px !important}.autocomplete .autocomplete-list{height:100% !important;max-height:none !important;background:none !important;border:none !important;padding:100px 30px !important;z-index:0 !important;-webkit-overflow-scrolling:touch}.autocomplete .autocomplete-list::-webkit-scrollbar{width:0}.autocomplete .autocomplete-list-item{color:#fff !important;padding:20px !important;margin-top:5px}.autocomplete .selected{background:var(--ter) !important;border-radius:1rem}.autocomplete .confirmed{background:var(--ter-light) !important;border-radius:1rem}@-webkit-keyframes svelte-1gu4lxd-fadeIn{from{opacity:0}to{opacity:1}}@keyframes svelte-1gu4lxd-fadeIn{from{opacity:0}to{opacity:1}}@-webkit-keyframes svelte-1gu4lxd-fadeOut{from{opacity:1}to{opacity:0}}@keyframes svelte-1gu4lxd-fadeOut{from{opacity:1}to{opacity:0}}@-webkit-keyframes svelte-1gu4lxd-scaleIn{from{transform:scale(0, 0);opacity:0}to{transform:scale(1, 1);opacity:1}}@keyframes svelte-1gu4lxd-scaleIn{from{transform:scale(0, 0);opacity:0}to{transform:scale(1, 1);opacity:1}}@-webkit-keyframes svelte-1gu4lxd-scaleOut{from{transform:scale(1, 1);opacity:1}to{transform:scale(0, 0);opacity:0}}@keyframes svelte-1gu4lxd-scaleOut{from{transform:scale(1, 1);opacity:1}to{transform:scale(0, 0);opacity:0}}@-webkit-keyframes svelte-1gu4lxd-fromTop{from{transform:translate3d(0, -100vh, 0)}to{transform:translate3d(0, 0, 0)}}@keyframes svelte-1gu4lxd-fromTop{from{transform:translate3d(0, -100vh, 0)}to{transform:translate3d(0, 0, 0)}}@-webkit-keyframes svelte-1gu4lxd-fromLeft{from{transform:translateX(-100vw)}to{transform:translateX(0)}}@keyframes svelte-1gu4lxd-fromLeft{from{transform:translateX(-100vw)}to{transform:translateX(0)}}@-webkit-keyframes svelte-1gu4lxd-fromRight{from{transform:translateX(100vw);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes svelte-1gu4lxd-fromRight{from{transform:translateX(100vw);opacity:0}to{transform:translateX(0);opacity:1}}@-webkit-keyframes svelte-1gu4lxd-fromBot{from{transform:translate3d(0, 100vh, 0)}to{transform:translate3d(0, 0, 0)}}@keyframes svelte-1gu4lxd-fromBot{from{transform:translate3d(0, 100vh, 0)}to{transform:translate3d(0, 0, 0)}}@-webkit-keyframes svelte-1gu4lxd-toTop{from{transform:translateY(0)}to{transform:translateY(-100vh)}}@keyframes svelte-1gu4lxd-toTop{from{transform:translateY(0)}to{transform:translateY(-100vh)}}@-webkit-keyframes svelte-1gu4lxd-toLeft{from{transform:translateX(0)}to{transform:translateX(-100vw)}}@keyframes svelte-1gu4lxd-toLeft{from{transform:translateX(0)}to{transform:translateX(-100vw)}}@-webkit-keyframes svelte-1gu4lxd-toRight{from{transform:translateX(0)}to{transform:translateX(100vw)}}@keyframes svelte-1gu4lxd-toRight{from{transform:translateX(0)}to{transform:translateX(100vw)}}@-webkit-keyframes svelte-1gu4lxd-toBot{from{transform:translateY(0)}to{transform:translateY(100vh)}}@keyframes svelte-1gu4lxd-toBot{from{transform:translateY(0)}to{transform:translateY(100vh)}}@-webkit-keyframes svelte-1gu4lxd-fromFlipX{from{transform:rotateX(90deg);position:absolute}to{transform:rotateX(0)}}@keyframes svelte-1gu4lxd-fromFlipX{from{transform:rotateX(90deg);position:absolute}to{transform:rotateX(0)}}@-webkit-keyframes svelte-1gu4lxd-toFlipX{from{transform:rotateX(0);position:absolute}to{transform:rotateX(90deg)}}@keyframes svelte-1gu4lxd-toFlipX{from{transform:rotateX(0);position:absolute}to{transform:rotateX(90deg)}}@-webkit-keyframes svelte-1gu4lxd-fromFlipY{from{transform:rotateY(90deg);position:absolute}to{transform:rotateY(0)}}@keyframes svelte-1gu4lxd-fromFlipY{from{transform:rotateY(90deg);position:absolute}to{transform:rotateY(0)}}@-webkit-keyframes svelte-1gu4lxd-toFlipY{from{transform:rotateY(0);position:absolute}to{transform:rotateY(90deg)}}@keyframes svelte-1gu4lxd-toFlipY{from{transform:rotateY(0);position:absolute}to{transform:rotateY(90deg)}}@-webkit-keyframes svelte-1gu4lxd-shake{0%{transform:translateX(1px)}10%{transform:translateX(-1px)}20%{transform:translateX(-3px)}30%{transform:translateX(3px)}40%{transform:translateX(1px)}50%{transform:translateX(-1px)}60%{transform:translateX(-3px)}70%{transform:translateX(3px)}80%{transform:translateX(-1px)}90%{transform:translateX(1px)}100%{transform:translateX(1px)}}@keyframes svelte-1gu4lxd-shake{0%{transform:translateX(1px)}10%{transform:translateX(-1px)}20%{transform:translateX(-3px)}30%{transform:translateX(3px)}40%{transform:translateX(1px)}50%{transform:translateX(-1px)}60%{transform:translateX(-3px)}70%{transform:translateX(3px)}80%{transform:translateX(-1px)}90%{transform:translateX(1px)}100%{transform:translateX(1px)}}@-webkit-keyframes svelte-1gu4lxd-bounce{0%,20%,50%,80%,100%{transform:translateY(0)}40%{transform:translateY(-30px)}60%{transform:translateY(-20px)}}@keyframes svelte-1gu4lxd-bounce{0%,20%,50%,80%,100%{transform:translateY(0)}40%{transform:translateY(-30px)}60%{transform:translateY(-20px)}}@-webkit-keyframes svelte-1gu4lxd-pulse{0%,20%,50%,80%,100%{transform:scale(1)}40%{transform:scale(1.1)}60%{transform:scale(0.8)}}@keyframes svelte-1gu4lxd-pulse{0%,20%,50%,80%,100%{transform:scale(1)}40%{transform:scale(1.1)}60%{transform:scale(0.8)}}button,a.btn{cursor:pointer;display:block;background-color:transparent;font-size:0.9em;font-weight:bold;color:#000;border:2px solid transparent;padding:0.9em 2em;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none;transition:200ms}button:hover,a.btn:hover{transform:scale(0.95)}button.round,a.round{border-radius:4em}button.semi,a.semi{border-radius:0.4em}button.out,a.out{border-color:#000}button.disabled,a.disabeled{cursor:not-allowed;background:#808080;color:#e6e6e6}button.pri,a.pri{background:skyblue;border-color:skyblue}button.sec,a.sec{background:navy;border-color:navy}button.black,a.black{background:#000;border-color:#000;color:#fafafa}button.white,a.white{background:#fff;border-color:#fff}button.link,a.link{background:#2d8cf0;border-color:#2d8cf0;color:#fff}button.succ,a.succ{background:#19be6b;border-color:#19be6b;color:#fff}button.warn,a.warn{background:#ff9900;border-color:#ff9900}button.err,a.err{background:#ed3f14;border-color:#ed3f14;color:#fff}button.outpri,a.outpri{color:skyblue;border-color:skyblue}button.outsec,a.outsec{color:navy;border-color:navy}button.outblack,a.outblack{color:#000;border-color:#000}button.outwhite,a.outwhite{color:#fff;border-color:#fff}button.outlink,a.outlink{color:#2d8cf0;border-color:#2d8cf0}button.outsucc,a.outsucc{color:#19be6b;border-color:#19be6b}button.outwarn,a.outwarn{color:#ff9900;border-color:#ff9900}button.outerr,a.outerr{color:#ed3f14;border-color:#ed3f14}.view{position:relative;width:100%;height:100%;display:flex;overflow:hidden}.scroll{position:relative;width:100%;height:100%;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}.scroll::-webkit-scrollbar{width:7px}.scroll::-webkit-scrollbar-track{background-color:#e6e6e6}.scroll::-webkit-scrollbar-thumb{background-color:skyblue}.box{border:1px solid #e6e6e6;padding:0.9em 1em}.box.round{border-radius:0.4em}.slider{position:relative;width:100%;display:block;overflow-x:auto;overflow-y:hidden;white-space:nowrap;-webkit-overflow-scrolling:touch;-ms-overflow-style:none;scrollbar-width:none}.slider::-webkit-scrollbar{display:none}.slider *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.slide{display:inline-flex}.row{width:auto;display:flex;flex-flow:wrap;justify-content:flex-start;align-items:flex-start}.col{width:auto;display:flex;flex-flow:column;justify-content:flex-start;align-items:flex-start}.nowrap{flex-wrap:nowrap;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}h-div{width:100%;height:1px;display:flex;background:#e6e6e6}v-div{width:1px;height:100%;display:flex;background:#e6e6e6}.jstart{justify-content:flex-start}.jcenter{justify-content:center}.jend{justify-content:flex-end}.jbetween{justify-content:space-between}.jaround{justify-content:space-around}.jevenly{justify-content:space-evenly}.astart{align-items:flex-start}.acenter{align-items:center}.astretch{align-items:stretch}.abase{align-items:baseline}.aend{align-items:flex-end}.fstart{justify-content:flex-start;align-items:flex-start}.fcenter{justify-content:center;align-items:center}.fend{justify-content:flex-end;align-items:flex-end}.xfill{width:100%}.xhalf{width:50%}.yfill{height:100%}.yhalf{height:50%}.fill{width:100%;height:100%}.grow{flex-grow:1}input,select,textarea{background:transparent;color:#000;font-size:0.9em;padding:0.9em 1em;transition:200ms}input.round,select.round,textarea.round{border-radius:4em;padding:0.9em 1.2em}input.semi,select.semi,textarea.semi{border-radius:0.4em}input.out,select.out,textarea.out{border:1px solid #e6e6e6}input.disabled,select.dissabled,textarea.disabled{cursor:not-allowed;background:#e6e6e6;color:#808080}input.white,select.white,textarea.white{background:#fff}input.black,select.black,textarea.black{background:#000}b.pri{color:#2d8cf0}b.sec{color:#2d8cf0}b.link{color:#2d8cf0}b.succ{color:#19be6b}b.warn{color:#ff9900}b.err{color:#ed3f14}.wrapper.svelte-1gu4lxd{position:relative}@media(hover: hover){.wrapper.svelte-1gu4lxd{max-width:400px;max-height:800px;border-radius:3rem;box-shadow:var(--shadow), var(--glass-shadow);overflow:hidden}}.day.svelte-1gu4lxd{background:var(--bg)}.night.svelte-1gu4lxd{background:var(--bg)}',
      map: null
    };
    _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $navVisible, $$unsubscribe_navVisible;
      $$unsubscribe_navVisible = subscribe(navVisible, (value) => $navVisible = value);
      $$result.css.add(css);
      $$unsubscribe_navVisible();
      return `<div id="${"app"}" class="${escape(daySection()) + " row fcenter fill svelte-1gu4lxd"}"><div class="${"wrapper row fill svelte-1gu4lxd"}">${validate_component(Background, "Background").$$render($$result, {}, {}, {})}
		${slots.default ? slots.default({}) : ``}

		${$navVisible ? `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}` : ``}</div>
</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css2,
  entry: () => entry,
  js: () => js,
  module: () => layout_svelte_exports
});
var entry, js, css2;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_svelte();
    entry = "pages/__layout.svelte-b274870b.js";
    js = ["pages/__layout.svelte-b274870b.js", "chunks/index-66bb8367.js", "chunks/utils-2cacb67e.js", "chunks/stores-225cf51e.js", "chunks/index-13b285a7.js"];
    css2 = ["assets/pages/__layout.svelte-92ba4ef9.css"];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2,
  load: () => load
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_index_0ebd485b();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css3,
  entry: () => entry2,
  js: () => js2,
  module: () => error_svelte_exports
});
var entry2, js2, css3;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_error_svelte();
    entry2 = "error.svelte-260a9dc2.js";
    js2 = ["error.svelte-260a9dc2.js", "chunks/index-66bb8367.js"];
    css3 = [];
  }
});

// .svelte-kit/output/server/entries/pages/index.svelte.js
var index_svelte_exports = {};
__export(index_svelte_exports, {
  default: () => Routes
});
function guard(name) {
  return () => {
    throw new Error(`Cannot call ${name}(...) on the server`);
  };
}
var goto, css4, Routes;
var init_index_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/index.svelte.js"() {
    init_index_0ebd485b();
    init_stores_a7955130();
    init_utils_67530605();
    goto = guard("goto");
    css4 = {
      code: ".wrapper.svelte-4kp5bv.svelte-4kp5bv{position:relative;color:#fff;padding:30px}.logo.svelte-4kp5bv.svelte-4kp5bv{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);max-width:250px;opacity:0;-webkit-animation:svelte-4kp5bv-fadeIn 1s ease-out;animation:svelte-4kp5bv-fadeIn 1s ease-out;-webkit-animation-delay:1s;animation-delay:1s;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.cta.svelte-4kp5bv.svelte-4kp5bv{opacity:0;-webkit-animation:svelte-4kp5bv-fromBottom 500ms ease-out;animation:svelte-4kp5bv-fromBottom 500ms ease-out;-webkit-animation-delay:2s;animation-delay:2s;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}input.svelte-4kp5bv.svelte-4kp5bv{background:rgba(255, 255, 255, 0.6);font-size:16px;border-radius:1rem;padding:20px 32px;margin-bottom:20px}button.svelte-4kp5bv.svelte-4kp5bv{background:var(--ter);color:#fff;font-size:12px;border:0;border-radius:1rem;padding:20px 32px}button.svelte-4kp5bv img.svelte-4kp5bv{cursor:pointer;width:20px;margin-right:10px}@-webkit-keyframes svelte-4kp5bv-fadeOut{from{opacity:1}to{opacity:0}}@keyframes svelte-4kp5bv-fadeOut{from{opacity:1}to{opacity:0}}@-webkit-keyframes svelte-4kp5bv-fromBottom{from{opacity:0;transform:translateY(200px)}to{opacity:1;transform:translateY(0)}}@keyframes svelte-4kp5bv-fromBottom{from{opacity:0;transform:translateY(200px)}to{opacity:1;transform:translateY(0)}}@-webkit-keyframes svelte-4kp5bv-fadeIn{from{opacity:0}to{opacity:1}}@keyframes svelte-4kp5bv-fadeIn{from{opacity:0}to{opacity:1}}",
      map: null
    };
    Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $UserSettings, $$unsubscribe_UserSettings;
      let $navVisible, $$unsubscribe_navVisible;
      $$unsubscribe_UserSettings = subscribe(UserSettings, (value) => $UserSettings = value);
      $$unsubscribe_navVisible = subscribe(navVisible, (value) => $navVisible = value);
      set_store_value(navVisible, $navVisible = false, $navVisible);
      const { city } = $UserSettings;
      if (city)
        goto(`address/${city}`);
      $$result.css.add(css4);
      $$unsubscribe_UserSettings();
      $$unsubscribe_navVisible();
      return `<div class="${"wrapper col jend acenter fill svelte-4kp5bv"}"><img class="${"logo xfill svelte-4kp5bv"}"${add_attribute("src", daySection() === "day" ? "/logo.svg" : "/logo-w.svg", 0)} alt="${"Midu Weather"}">

	<div class="${"cta col acenter xfill svelte-4kp5bv"}"><input class="${"xfill svelte-4kp5bv"}" type="${"text"}" name="${"city"}" id="${"city"}" placeholder="${"Search for a location"}" autocomplete="${"off"}">

		<button class="${"row acenter svelte-4kp5bv"}"><img src="${"/geolocation.svg"}" alt="${"Get address"}" class="${"svelte-4kp5bv"}"> FIND LOCATION
		</button></div>
</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports3 = {};
__export(__exports3, {
  css: () => css5,
  entry: () => entry3,
  js: () => js3,
  module: () => index_svelte_exports
});
var entry3, js3, css5;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_index_svelte();
    entry3 = "pages/index.svelte-4bc5a8a3.js";
    js3 = ["pages/index.svelte-4bc5a8a3.js", "chunks/index-66bb8367.js", "chunks/stores-225cf51e.js", "chunks/index-13b285a7.js", "chunks/navigation-0e6511d1.js", "chunks/singletons-d1fb5791.js", "chunks/utils-2cacb67e.js"];
    css5 = ["assets/pages/index.svelte-f0ba97ab.css"];
  }
});

// .svelte-kit/output/server/entries/pages/search/index.svelte.js
var index_svelte_exports2 = {};
__export(index_svelte_exports2, {
  default: () => Search_1
});
function safeFunction(theFunction, argument) {
  if (typeof theFunction !== "function") {
    console.error("Not a function: " + theFunction + ", argument: " + argument);
    return void 0;
  }
  let result;
  try {
    result = theFunction(argument);
  } catch (error2) {
    console.warn("Error executing Autocomplete function on value: " + argument + " function: " + theFunction);
  }
  return result;
}
function safeStringFunction(theFunction, argument) {
  let result = safeFunction(theFunction, argument);
  if (result === void 0 || result === null) {
    result = "";
  }
  if (typeof result !== "string") {
    result = result.toString();
  }
  return result;
}
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
async function getItems(term) {
  const req = await fetch(`https://weatherapi-com.p.rapidapi.com/search.json?q=${term}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      "X-RapidAPI-Key": "5c893bec38msh12ab05cc8f6121fp11d64ejsn294a1e6ac98d"
    }
  });
  if (!req.ok)
    return;
  const res = await req.json();
  return res;
}
var css$22, SimpleAutocomplete, css$12, Search, css6, Search_1;
var init_index_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/search/index.svelte.js"() {
    init_index_0ebd485b();
    init_stores_a7955130();
    css$22 = {
      code: '.autocomplete.svelte-14pr1bu.svelte-14pr1bu{min-width:200px;display:inline-block;max-width:100%;position:relative;vertical-align:top;height:2.25em}.autocomplete.svelte-14pr1bu.svelte-14pr1bu:not(.hide-arrow):not(.is-loading)::after{border:3px solid;border-radius:2px;border-right:0;border-top:0;content:" ";display:block;height:0.625em;margin-top:-0.4375em;pointer-events:none;position:absolute;top:50%;transform:rotate(-45deg);transform-origin:center;width:0.625em;border-color:#3273dc;right:1.125em;z-index:4}.autocomplete.show-clear.svelte-14pr1bu.svelte-14pr1bu:not(.hide-arrow)::after{right:2.3em}.autocomplete.svelte-14pr1bu .svelte-14pr1bu{box-sizing:border-box}.autocomplete-input.svelte-14pr1bu.svelte-14pr1bu{font:inherit;width:100%;height:100%;padding:5px 11px}.autocomplete.svelte-14pr1bu:not(.hide-arrow) .autocomplete-input.svelte-14pr1bu{padding-right:2em}.autocomplete.show-clear.svelte-14pr1bu:not(.hide-arrow) .autocomplete-input.svelte-14pr1bu{padding-right:3.2em}.autocomplete.hide-arrow.show-clear.svelte-14pr1bu .autocomplete-input.svelte-14pr1bu{padding-right:2em}.autocomplete-list.svelte-14pr1bu.svelte-14pr1bu{background:#fff;position:relative;width:100%;overflow-y:auto;z-index:99;padding:10px 0;top:0px;border:1px solid #999;max-height:calc(15 * (1rem + 10px) + 15px);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.autocomplete-list.svelte-14pr1bu.svelte-14pr1bu:empty{padding:0}.autocomplete-list-item.svelte-14pr1bu.svelte-14pr1bu{padding:5px 15px;color:#333;cursor:pointer;line-height:1}.autocomplete-list-item.confirmed.svelte-14pr1bu.svelte-14pr1bu{background-color:#789fed;color:#fff}.autocomplete-list-item.selected.svelte-14pr1bu.svelte-14pr1bu{background-color:#2e69e2;color:#fff}.autocomplete-list-item-no-results.svelte-14pr1bu.svelte-14pr1bu{padding:5px 15px;color:#999;line-height:1}.autocomplete-list-item-create.svelte-14pr1bu.svelte-14pr1bu{padding:5px 15px;line-height:1}.autocomplete-list-item-loading.svelte-14pr1bu.svelte-14pr1bu{padding:5px 15px;line-height:1}.autocomplete-list.hidden.svelte-14pr1bu.svelte-14pr1bu{display:none}.autocomplete.show-clear.svelte-14pr1bu .autocomplete-clear-button.svelte-14pr1bu{cursor:pointer;display:block;text-align:center;position:absolute;right:0.1em;padding:0.3em 0.6em;top:50%;transform:translateY(-50%);z-index:4}.autocomplete.svelte-14pr1bu:not(.show-clear) .autocomplete-clear-button.svelte-14pr1bu{display:none}.autocomplete.svelte-14pr1bu select.svelte-14pr1bu{display:none}.autocomplete.is-multiple.svelte-14pr1bu .input-container.svelte-14pr1bu{height:auto;box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.1);border-radius:4px;border:1px solid #b5b5b5;padding-left:0.4em;padding-right:0.4em;display:flex;flex-wrap:wrap;align-items:stretch;background-color:#fff}.autocomplete.is-multiple.svelte-14pr1bu .tag.svelte-14pr1bu{display:flex;margin-top:0.5em;margin-bottom:0.3em}.autocomplete.is-multiple.svelte-14pr1bu .tag.is-delete.svelte-14pr1bu{cursor:pointer}.autocomplete.is-multiple.svelte-14pr1bu .tags.svelte-14pr1bu{margin-right:0.3em;margin-bottom:0}.autocomplete.is-multiple.svelte-14pr1bu .autocomplete-input.svelte-14pr1bu{display:flex;width:100%;flex:1 1 50px;min-width:3em;border:none;box-shadow:none;background:none}',
      map: null
    };
    SimpleAutocomplete = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let showList;
      let clearable;
      let { items = [] } = $$props;
      let { searchFunction = false } = $$props;
      let { labelFieldName = void 0 } = $$props;
      let { keywordsFieldName = labelFieldName } = $$props;
      let { valueFieldName = void 0 } = $$props;
      let { labelFunction = function(item) {
        if (item === void 0 || item === null) {
          return "";
        }
        return labelFieldName ? item[labelFieldName] : item;
      } } = $$props;
      let { keywordsFunction = function(item) {
        if (item === void 0 || item === null) {
          return "";
        }
        return keywordsFieldName ? item[keywordsFieldName] : labelFunction(item);
      } } = $$props;
      let { valueFunction = function(item, forceSingle = false) {
        if (item === void 0 || item === null) {
          return item;
        }
        if (!multiple || forceSingle) {
          return valueFieldName ? item[valueFieldName] : item;
        } else {
          return item.map((i2) => valueFieldName ? i2[valueFieldName] : i2);
        }
      } } = $$props;
      let { keywordsCleanFunction = function(keywords) {
        return keywords;
      } } = $$props;
      let { textCleanFunction = function(userEnteredText) {
        return userEnteredText;
      } } = $$props;
      let { beforeChange = function(oldSelectedItem, newSelectedItem) {
        return true;
      } } = $$props;
      let { onChange = function(newSelectedItem) {
      } } = $$props;
      let { onFocus = function() {
      } } = $$props;
      let { onBlur = function() {
      } } = $$props;
      let { onCreate = function(text2) {
        if (debug) {
          console.log("onCreate: " + text2);
        }
      } } = $$props;
      let { selectFirstIfEmpty = false } = $$props;
      let { minCharactersToSearch = 1 } = $$props;
      let { maxItemsToShowInList = 0 } = $$props;
      let { multiple = false } = $$props;
      let { create = false } = $$props;
      let { ignoreAccents = true } = $$props;
      let { matchAllKeywords = true } = $$props;
      let { sortByMatchedKeywords = false } = $$props;
      let { itemFilterFunction = void 0 } = $$props;
      let { itemSortFunction = void 0 } = $$props;
      let { lock = false } = $$props;
      let { delay = 0 } = $$props;
      let { localFiltering = true } = $$props;
      let { localSorting = true } = $$props;
      let { cleanUserText = true } = $$props;
      let { closeOnBlur = false } = $$props;
      let { hideArrow = false } = $$props;
      let { showClear = false } = $$props;
      let { showLoadingIndicator = false } = $$props;
      let { noResultsText = "No results found" } = $$props;
      let { loadingText = "Loading results..." } = $$props;
      let { moreItemsText = "items not shown" } = $$props;
      let { createText = "Not found, add anyway?" } = $$props;
      let { placeholder = void 0 } = $$props;
      let { className = void 0 } = $$props;
      let { inputClassName = void 0 } = $$props;
      let { inputId = void 0 } = $$props;
      let { name = void 0 } = $$props;
      let { selectName = void 0 } = $$props;
      let { selectId = void 0 } = $$props;
      let { title = void 0 } = $$props;
      let { html5autocomplete = void 0 } = $$props;
      let { readonly = void 0 } = $$props;
      let { dropdownClassName = void 0 } = $$props;
      let { disabled = false } = $$props;
      let { noInputStyles = false } = $$props;
      let { required = null } = $$props;
      let { debug = false } = $$props;
      let { tabindex = 0 } = $$props;
      let { selectedItem = multiple ? [] : void 0 } = $$props;
      let { value = void 0 } = $$props;
      let { highlightedItem = void 0 } = $$props;
      const uniqueId = "sautocomplete-" + Math.floor(Math.random() * 1e3);
      let input;
      let list;
      let opened = false;
      let loading = false;
      let highlightIndex = -1;
      let { text } = $$props;
      let filteredListItems;
      let listItems = [];
      function safeLabelFunction(item) {
        return safeStringFunction(labelFunction, item);
      }
      function safeKeywordsFunction(item) {
        const keywords = safeStringFunction(keywordsFunction, item);
        let result = safeStringFunction(keywordsCleanFunction, keywords);
        result = result.toLowerCase().trim();
        if (ignoreAccents) {
          result = removeAccents(result);
        }
        if (debug) {
          console.log("Extracted keywords: '" + result + "' from item: " + JSON.stringify(item));
        }
        return result;
      }
      function prepareListItems() {
        let timerId;
        if (debug) {
          timerId = `Autocomplete prepare list ${inputId ? `(id: ${inputId})` : ""}`;
          console.time(timerId);
          console.log("Prepare items to search");
          console.log("items: " + JSON.stringify(items));
        }
        if (!Array.isArray(items)) {
          console.warn("Autocomplete items / search function did not return array but", items);
          items = [];
        }
        const length = items ? items.length : 0;
        listItems = new Array(length);
        if (length > 0) {
          items.forEach((item, i2) => {
            const listItem = getListItem(item);
            if (listItem === void 0) {
              console.log("Undefined item for: ", item);
            }
            listItems[i2] = listItem;
          });
        }
        filteredListItems = listItems;
        if (debug) {
          console.log(listItems.length + " items to search");
          console.timeEnd(timerId);
        }
      }
      function getListItem(item) {
        return {
          keywords: localFiltering ? safeKeywordsFunction(item) : [],
          label: safeLabelFunction(item),
          item
        };
      }
      function onSelectedItemChanged() {
        value = valueFunction(selectedItem);
        text = !multiple ? safeLabelFunction(selectedItem) : "";
        filteredListItems = listItems;
        onChange(selectedItem);
      }
      function unselectItem(tag) {
        if (debug) {
          console.log("unselectItem", tag);
        }
        selectedItem = selectedItem.filter((i2) => i2 !== tag);
        input.focus();
      }
      function highlightFilter(keywords, field) {
        return (item) => {
          let label = item[field];
          const newItem = Object.assign({ highlighted: void 0 }, item);
          newItem.highlighted = label;
          const labelLowercase = label.toLowerCase();
          const labelLowercaseNoAc = ignoreAccents ? removeAccents(labelLowercase) : labelLowercase;
          if (keywords && keywords.length) {
            const positions = [];
            for (let i2 = 0; i2 < keywords.length; i2++) {
              let keyword = keywords[i2];
              if (ignoreAccents) {
                keyword = removeAccents(keyword);
              }
              const keywordLen = keyword.length;
              let pos1 = 0;
              do {
                pos1 = labelLowercaseNoAc.indexOf(keyword, pos1);
                if (pos1 >= 0) {
                  let pos2 = pos1 + keywordLen;
                  positions.push([pos1, pos2]);
                  pos1 = pos2;
                }
              } while (pos1 !== -1);
            }
            if (positions.length > 0) {
              const keywordPatterns = /* @__PURE__ */ new Set();
              for (let i2 = 0; i2 < positions.length; i2++) {
                const pair = positions[i2];
                const pos1 = pair[0];
                const pos2 = pair[1];
                const keywordPattern = labelLowercase.substring(pos1, pos2);
                keywordPatterns.add(keywordPattern);
              }
              for (let keywordPattern of keywordPatterns) {
                if (keywordPattern === "b") {
                  continue;
                }
                const reg = new RegExp("(" + keywordPattern + ")", "ig");
                const newHighlighted = newItem.highlighted.replace(reg, "<b>$1</b>");
                newItem.highlighted = newHighlighted;
              }
            }
          }
          return newItem;
        };
      }
      function isConfirmed(listItem) {
        if (!selectedItem) {
          return false;
        }
        if (multiple) {
          return selectedItem.includes(listItem);
        } else {
          return listItem === selectedItem;
        }
      }
      if ($$props.items === void 0 && $$bindings.items && items !== void 0)
        $$bindings.items(items);
      if ($$props.searchFunction === void 0 && $$bindings.searchFunction && searchFunction !== void 0)
        $$bindings.searchFunction(searchFunction);
      if ($$props.labelFieldName === void 0 && $$bindings.labelFieldName && labelFieldName !== void 0)
        $$bindings.labelFieldName(labelFieldName);
      if ($$props.keywordsFieldName === void 0 && $$bindings.keywordsFieldName && keywordsFieldName !== void 0)
        $$bindings.keywordsFieldName(keywordsFieldName);
      if ($$props.valueFieldName === void 0 && $$bindings.valueFieldName && valueFieldName !== void 0)
        $$bindings.valueFieldName(valueFieldName);
      if ($$props.labelFunction === void 0 && $$bindings.labelFunction && labelFunction !== void 0)
        $$bindings.labelFunction(labelFunction);
      if ($$props.keywordsFunction === void 0 && $$bindings.keywordsFunction && keywordsFunction !== void 0)
        $$bindings.keywordsFunction(keywordsFunction);
      if ($$props.valueFunction === void 0 && $$bindings.valueFunction && valueFunction !== void 0)
        $$bindings.valueFunction(valueFunction);
      if ($$props.keywordsCleanFunction === void 0 && $$bindings.keywordsCleanFunction && keywordsCleanFunction !== void 0)
        $$bindings.keywordsCleanFunction(keywordsCleanFunction);
      if ($$props.textCleanFunction === void 0 && $$bindings.textCleanFunction && textCleanFunction !== void 0)
        $$bindings.textCleanFunction(textCleanFunction);
      if ($$props.beforeChange === void 0 && $$bindings.beforeChange && beforeChange !== void 0)
        $$bindings.beforeChange(beforeChange);
      if ($$props.onChange === void 0 && $$bindings.onChange && onChange !== void 0)
        $$bindings.onChange(onChange);
      if ($$props.onFocus === void 0 && $$bindings.onFocus && onFocus !== void 0)
        $$bindings.onFocus(onFocus);
      if ($$props.onBlur === void 0 && $$bindings.onBlur && onBlur !== void 0)
        $$bindings.onBlur(onBlur);
      if ($$props.onCreate === void 0 && $$bindings.onCreate && onCreate !== void 0)
        $$bindings.onCreate(onCreate);
      if ($$props.selectFirstIfEmpty === void 0 && $$bindings.selectFirstIfEmpty && selectFirstIfEmpty !== void 0)
        $$bindings.selectFirstIfEmpty(selectFirstIfEmpty);
      if ($$props.minCharactersToSearch === void 0 && $$bindings.minCharactersToSearch && minCharactersToSearch !== void 0)
        $$bindings.minCharactersToSearch(minCharactersToSearch);
      if ($$props.maxItemsToShowInList === void 0 && $$bindings.maxItemsToShowInList && maxItemsToShowInList !== void 0)
        $$bindings.maxItemsToShowInList(maxItemsToShowInList);
      if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
        $$bindings.multiple(multiple);
      if ($$props.create === void 0 && $$bindings.create && create !== void 0)
        $$bindings.create(create);
      if ($$props.ignoreAccents === void 0 && $$bindings.ignoreAccents && ignoreAccents !== void 0)
        $$bindings.ignoreAccents(ignoreAccents);
      if ($$props.matchAllKeywords === void 0 && $$bindings.matchAllKeywords && matchAllKeywords !== void 0)
        $$bindings.matchAllKeywords(matchAllKeywords);
      if ($$props.sortByMatchedKeywords === void 0 && $$bindings.sortByMatchedKeywords && sortByMatchedKeywords !== void 0)
        $$bindings.sortByMatchedKeywords(sortByMatchedKeywords);
      if ($$props.itemFilterFunction === void 0 && $$bindings.itemFilterFunction && itemFilterFunction !== void 0)
        $$bindings.itemFilterFunction(itemFilterFunction);
      if ($$props.itemSortFunction === void 0 && $$bindings.itemSortFunction && itemSortFunction !== void 0)
        $$bindings.itemSortFunction(itemSortFunction);
      if ($$props.lock === void 0 && $$bindings.lock && lock !== void 0)
        $$bindings.lock(lock);
      if ($$props.delay === void 0 && $$bindings.delay && delay !== void 0)
        $$bindings.delay(delay);
      if ($$props.localFiltering === void 0 && $$bindings.localFiltering && localFiltering !== void 0)
        $$bindings.localFiltering(localFiltering);
      if ($$props.localSorting === void 0 && $$bindings.localSorting && localSorting !== void 0)
        $$bindings.localSorting(localSorting);
      if ($$props.cleanUserText === void 0 && $$bindings.cleanUserText && cleanUserText !== void 0)
        $$bindings.cleanUserText(cleanUserText);
      if ($$props.closeOnBlur === void 0 && $$bindings.closeOnBlur && closeOnBlur !== void 0)
        $$bindings.closeOnBlur(closeOnBlur);
      if ($$props.hideArrow === void 0 && $$bindings.hideArrow && hideArrow !== void 0)
        $$bindings.hideArrow(hideArrow);
      if ($$props.showClear === void 0 && $$bindings.showClear && showClear !== void 0)
        $$bindings.showClear(showClear);
      if ($$props.showLoadingIndicator === void 0 && $$bindings.showLoadingIndicator && showLoadingIndicator !== void 0)
        $$bindings.showLoadingIndicator(showLoadingIndicator);
      if ($$props.noResultsText === void 0 && $$bindings.noResultsText && noResultsText !== void 0)
        $$bindings.noResultsText(noResultsText);
      if ($$props.loadingText === void 0 && $$bindings.loadingText && loadingText !== void 0)
        $$bindings.loadingText(loadingText);
      if ($$props.moreItemsText === void 0 && $$bindings.moreItemsText && moreItemsText !== void 0)
        $$bindings.moreItemsText(moreItemsText);
      if ($$props.createText === void 0 && $$bindings.createText && createText !== void 0)
        $$bindings.createText(createText);
      if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
        $$bindings.placeholder(placeholder);
      if ($$props.className === void 0 && $$bindings.className && className !== void 0)
        $$bindings.className(className);
      if ($$props.inputClassName === void 0 && $$bindings.inputClassName && inputClassName !== void 0)
        $$bindings.inputClassName(inputClassName);
      if ($$props.inputId === void 0 && $$bindings.inputId && inputId !== void 0)
        $$bindings.inputId(inputId);
      if ($$props.name === void 0 && $$bindings.name && name !== void 0)
        $$bindings.name(name);
      if ($$props.selectName === void 0 && $$bindings.selectName && selectName !== void 0)
        $$bindings.selectName(selectName);
      if ($$props.selectId === void 0 && $$bindings.selectId && selectId !== void 0)
        $$bindings.selectId(selectId);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.html5autocomplete === void 0 && $$bindings.html5autocomplete && html5autocomplete !== void 0)
        $$bindings.html5autocomplete(html5autocomplete);
      if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
        $$bindings.readonly(readonly);
      if ($$props.dropdownClassName === void 0 && $$bindings.dropdownClassName && dropdownClassName !== void 0)
        $$bindings.dropdownClassName(dropdownClassName);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.noInputStyles === void 0 && $$bindings.noInputStyles && noInputStyles !== void 0)
        $$bindings.noInputStyles(noInputStyles);
      if ($$props.required === void 0 && $$bindings.required && required !== void 0)
        $$bindings.required(required);
      if ($$props.debug === void 0 && $$bindings.debug && debug !== void 0)
        $$bindings.debug(debug);
      if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
        $$bindings.tabindex(tabindex);
      if ($$props.selectedItem === void 0 && $$bindings.selectedItem && selectedItem !== void 0)
        $$bindings.selectedItem(selectedItem);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.highlightedItem === void 0 && $$bindings.highlightedItem && highlightedItem !== void 0)
        $$bindings.highlightedItem(highlightedItem);
      if ($$props.text === void 0 && $$bindings.text && text !== void 0)
        $$bindings.text(text);
      if ($$props.highlightFilter === void 0 && $$bindings.highlightFilter && highlightFilter !== void 0)
        $$bindings.highlightFilter(highlightFilter);
      $$result.css.add(css$22);
      {
        searchFunction || prepareListItems();
      }
      {
        onSelectedItemChanged();
      }
      highlightedItem = filteredListItems && highlightIndex && highlightIndex >= 0 && highlightIndex < filteredListItems.length ? filteredListItems[highlightIndex].item : null;
      showList = opened;
      clearable = showClear || (lock || multiple) && selectedItem;
      return `<div class="${[
        escape(className ? className : "") + " " + escape(hideArrow || !items.length ? "hide-arrow" : "") + " " + escape(multiple ? "is-multiple" : "") + " autocomplete select is-fullwidth " + escape(uniqueId) + " svelte-14pr1bu",
        (clearable ? "show-clear" : "") + " " + (showLoadingIndicator && loading ? "is-loading" : "")
      ].join(" ").trim()}"><select${add_attribute("name", selectName, 0)}${add_attribute("id", selectId, 0)} ${multiple ? "multiple" : ""} class="${"svelte-14pr1bu"}">${!multiple && value ? `<option${add_attribute("value", value, 0)} selected class="${"svelte-14pr1bu"}">${escape(text)}</option>` : `${multiple && selectedItem ? `${each(selectedItem, (i2) => {
        return `<option${add_attribute("value", valueFunction(i2, true), 0)} selected class="${"svelte-14pr1bu"}">${escape(safeLabelFunction(i2))}
        </option>`;
      })}` : ``}`}</select>
  <div class="${"input-container svelte-14pr1bu"}">${multiple && selectedItem ? `${each(selectedItem, (tagItem) => {
        return `${slots.tag ? slots.tag({
          label: safeLabelFunction(tagItem),
          item: tagItem,
          unselectItem
        }) : `
          <div class="${"tags has-addons svelte-14pr1bu"}"><span class="${"tag svelte-14pr1bu"}">${escape(safeLabelFunction(tagItem))}</span>
            <span class="${"tag is-delete svelte-14pr1bu"}"></span></div>
        `}`;
      })}` : ``}
    <input type="${"text"}" class="${escape(inputClassName ? inputClassName : "") + " " + escape(noInputStyles ? "" : "input autocomplete-input") + " svelte-14pr1bu"}"${add_attribute("id", inputId ? inputId : "", 0)}${add_attribute("autocomplete", html5autocomplete ? "on" : "off", 0)}${add_attribute("placeholder", placeholder, 0)}${add_attribute("name", name, 0)} ${disabled ? "disabled" : ""} ${required ? "required" : ""}${add_attribute("title", title, 0)} ${readonly || lock && selectedItem ? "readonly" : ""}${add_attribute("tabindex", tabindex, 0)}${add_attribute("this", input, 0)}${add_attribute("value", text, 0)}>
    ${clearable ? `<span class="${"autocomplete-clear-button svelte-14pr1bu"}">\u2716</span>` : ``}</div>
  <div class="${escape(dropdownClassName ? dropdownClassName : "") + " autocomplete-list " + escape(showList ? "" : "hidden") + " is-fullwidth svelte-14pr1bu"}"${add_attribute("this", list, 0)}>${filteredListItems && filteredListItems.length > 0 ? `${each(filteredListItems, (listItem, i2) => {
        return `${listItem && (maxItemsToShowInList <= 0 || i2 < maxItemsToShowInList) ? `<div class="${[
          "autocomplete-list-item " + escape(i2 === highlightIndex ? "selected" : "") + " svelte-14pr1bu",
          isConfirmed(listItem.item) ? "confirmed" : ""
        ].join(" ").trim()}">${slots.item ? slots.item({
          item: listItem.item,
          label: listItem.highlighted ? listItem.highlighted : listItem.label
        }) : `
              ${listItem.highlighted ? `<!-- HTML_TAG_START -->${listItem.highlighted}<!-- HTML_TAG_END -->` : `<!-- HTML_TAG_START -->${listItem.label}<!-- HTML_TAG_END -->`}
            `}
          </div>` : ``}`;
      })}

      ${maxItemsToShowInList > 0 && filteredListItems.length > maxItemsToShowInList ? `${moreItemsText ? `<div class="${"autocomplete-list-item-no-results svelte-14pr1bu"}">...${escape(filteredListItems.length - maxItemsToShowInList)}
            ${escape(moreItemsText)}</div>` : ``}` : ``}` : `${`${create ? `<div class="${"autocomplete-list-item-create svelte-14pr1bu"}">${slots.create ? slots.create({ createText }) : `${escape(createText)}`}</div>` : `${noResultsText ? `<div class="${"autocomplete-list-item-no-results svelte-14pr1bu"}">${slots["no-results"] ? slots["no-results"]({ noResultsText }) : `${escape(noResultsText)}`}</div>` : ``}`}`}`}</div></div>

`;
    });
    css$12 = {
      code: "p.svelte-fnufvw{margin-bottom:5px}span.svelte-fnufvw{font-size:14px}",
      map: null
    };
    Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_UserSettings;
      let $navVisible, $$unsubscribe_navVisible;
      $$unsubscribe_UserSettings = subscribe(UserSettings, (value) => value);
      $$unsubscribe_navVisible = subscribe(navVisible, (value) => $navVisible = value);
      set_store_value(navVisible, $navVisible = true, $navVisible);
      let selection;
      $$result.css.add(css$12);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `${validate_component(SimpleAutocomplete, "AutoComplete").$$render($$result, {
          searchFunction: getItems,
          delay: "200",
          localFiltering: false,
          labelFieldName: "name",
          valueFieldName: "id",
          hideArrow: true,
          placeholder: "Search for a location",
          tabIndex: 1,
          selectedItem: selection
        }, {
          selectedItem: ($$value) => {
            selection = $$value;
            $$settled = false;
          }
        }, {
          item: ({ label, item }) => {
            return `<div class="${"col xfill"}" slot="${"item"}"><p class="${"svelte-fnufvw"}"><!-- HTML_TAG_START -->${label}<!-- HTML_TAG_END --></p>
		<span class="${"svelte-fnufvw"}">${escape(item.region)}, ${escape(item.country)}</span></div>`;
          }
        })}`;
      } while (!$$settled);
      $$unsubscribe_UserSettings();
      $$unsubscribe_navVisible();
      return $$rendered;
    });
    css6 = {
      code: ".scroll.svelte-cyw15g{transform:translateY(calc(100% - 100px));z-index:1;-webkit-animation:svelte-cyw15g-fromBottom 500ms ease-out;animation:svelte-cyw15g-fromBottom 500ms ease-out;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}@-webkit-keyframes svelte-cyw15g-fromBottom{to{opacity:1;transform:translateY(0)}}@keyframes svelte-cyw15g-fromBottom{to{opacity:1;transform:translateY(0)}}",
      map: null
    };
    Search_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css6);
      return `<div class="${"scroll svelte-cyw15g"}">${validate_component(Search, "Search").$$render($$result, {}, {}, {})}
</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports4 = {};
__export(__exports4, {
  css: () => css7,
  entry: () => entry4,
  js: () => js4,
  module: () => index_svelte_exports2
});
var entry4, js4, css7;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    init_index_svelte2();
    entry4 = "pages/search/index.svelte-4483ca30.js";
    js4 = ["pages/search/index.svelte-4483ca30.js", "chunks/index-66bb8367.js", "chunks/navigation-0e6511d1.js", "chunks/singletons-d1fb5791.js", "chunks/stores-225cf51e.js", "chunks/index-13b285a7.js"];
    css7 = ["assets/pages/search/index.svelte-f83a53ac.css"];
  }
});

// .svelte-kit/output/server/entries/pages/settings/index.svelte.js
var index_svelte_exports3 = {};
__export(index_svelte_exports3, {
  default: () => Settings
});
var css8, Settings;
var init_index_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/settings/index.svelte.js"() {
    init_index_0ebd485b();
    init_stores_a7955130();
    css8 = {
      code: "form.svelte-1h84385.svelte-1h84385{padding:30px;z-index:1}form.svelte-1h84385 label.svelte-1h84385{padding:5px 15px}form.svelte-1h84385 input.svelte-1h84385{background:rgba(255, 255, 255, 0.6);text-align:center;font-size:16px;border-radius:1rem;padding:20px 32px;overflow:hidden}form.svelte-1h84385 button.svelte-1h84385{min-width:200px;background:var(--ter);color:#fff;font-size:12px;border:0;border-radius:1rem;padding:20px 32px;margin-top:20px}",
      map: null
    };
    Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $UserSettings, $$unsubscribe_UserSettings;
      let $navVisible, $$unsubscribe_navVisible;
      $$unsubscribe_UserSettings = subscribe(UserSettings, (value) => $UserSettings = value);
      $$unsubscribe_navVisible = subscribe(navVisible, (value) => $navVisible = value);
      set_store_value(navVisible, $navVisible = true, $navVisible);
      let settings = $UserSettings;
      $$result.css.add(css8);
      $$unsubscribe_UserSettings();
      $$unsubscribe_navVisible();
      return `<form class="${"col fcenter fill svelte-1h84385"}"><div class="${"input-wrapper col acenter xfill"}"><label for="${"city"}" class="${"svelte-1h84385"}">Last city visited</label>
		<input class="${"xfill svelte-1h84385"}" type="${"text"}" id="${"city"}" name="${"city"}" placeholder="${"Ex. Barcelona"}" readonly${add_attribute("value", settings.city, 0)}></div>

	<button class="${"svelte-1h84385"}">RESET SETTINGS</button>
</form>`;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports5 = {};
__export(__exports5, {
  css: () => css9,
  entry: () => entry5,
  js: () => js5,
  module: () => index_svelte_exports3
});
var entry5, js5, css9;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    init_index_svelte3();
    entry5 = "pages/settings/index.svelte-073a0cc9.js";
    js5 = ["pages/settings/index.svelte-073a0cc9.js", "chunks/index-66bb8367.js", "chunks/navigation-0e6511d1.js", "chunks/singletons-d1fb5791.js", "chunks/stores-225cf51e.js", "chunks/index-13b285a7.js"];
    css9 = ["assets/pages/settings/index.svelte-667d35ec.css"];
  }
});

// .svelte-kit/output/server/entries/pages/address/_city_.svelte.js
var city_svelte_exports = {};
__export(city_svelte_exports, {
  default: () => U5Bcityu5D
});
var css$32, Stats, css$23, Hours, css$13, Days, css10, U5Bcityu5D;
var init_city_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/address/_city_.svelte.js"() {
    init_index_0ebd485b();
    init_stores_a7955130();
    init_utils_67530605();
    css$32 = {
      code: ".wrapper.svelte-wu1uy2.svelte-wu1uy2{padding:20px}article.svelte-wu1uy2.svelte-wu1uy2{position:relative;background:var(--bg-card);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:#fff;border-radius:1.5rem;padding:20px 0}article.svelte-wu1uy2 .svelte-wu1uy2:not(ul, .icon){padding:0 20px}article.svelte-wu1uy2 .sub.svelte-wu1uy2{color:var(--grey-light)}article.svelte-wu1uy2 .icon.svelte-wu1uy2{position:absolute;top:10px;right:10px}article.svelte-wu1uy2 output.svelte-wu1uy2{font-size:6rem;color:#fff;line-height:1;margin-top:40px}article.svelte-wu1uy2 ul.svelte-wu1uy2{margin-top:40px}article.svelte-wu1uy2 ul li.svelte-wu1uy2{max-width:33.3333333333%;border-right:1px solid var(--ter);padding:10px 20px;margin-bottom:10px}article.svelte-wu1uy2 ul li.svelte-wu1uy2:last-of-type{border-right:none}",
      map: null
    };
    Stats = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { location } = $$props;
      let { currentWeather } = $$props;
      if ($$props.location === void 0 && $$bindings.location && location !== void 0)
        $$bindings.location(location);
      if ($$props.currentWeather === void 0 && $$bindings.currentWeather && currentWeather !== void 0)
        $$bindings.currentWeather(currentWeather);
      $$result.css.add(css$32);
      return `<div class="${"wrapper svelte-wu1uy2"}"><article class="${"card col xfill svelte-wu1uy2"}"><h1 class="${"svelte-wu1uy2"}">${escape(location.city)}</h1>
		<p class="${"sub svelte-wu1uy2"}">${escape(location.region)}, ${escape(location.country)}</p>

		<img class="${"icon svelte-wu1uy2"}"${add_attribute("src", currentWeather.icon, 0)}${add_attribute("alt", currentWeather.condition, 0)}>

		<output class="${"row xfill svelte-wu1uy2"}">${escape(currentWeather.temp.celsius)}\xBA
		</output>
		<p class="${"sub svelte-wu1uy2"}">${escape(currentWeather.condition)}</p>

		<ul class="${"row jcenter xfill svelte-wu1uy2"}"><li class="${"col acenter svelte-wu1uy2"}"><p class="${"svelte-wu1uy2"}">${escape(currentWeather.feelslike.celsius)}\xBA</p>
				<small class="${"sub svelte-wu1uy2"}">F. like</small></li>

			<li class="${"col acenter svelte-wu1uy2"}"><p class="${"svelte-wu1uy2"}">${escape(currentWeather.humidity)}%</p>
				<small class="${"sub svelte-wu1uy2"}">Humidity</small></li>

			<li class="${"col acenter svelte-wu1uy2"}"><p class="${"svelte-wu1uy2"}">${escape(currentWeather.wind.speed.kph)}kph</p>
				<small class="${"sub svelte-wu1uy2"}">Wind</small></li></ul></article>
</div>`;
    });
    css$23 = {
      code: ".slider.svelte-muf7m4.svelte-muf7m4{padding:0 20px}.slide.svelte-muf7m4.svelte-muf7m4{cursor:pointer;scroll-margin:0 20px}li.svelte-muf7m4.svelte-muf7m4{margin-right:10px}li.svelte-muf7m4.svelte-muf7m4:last-of-type{margin-right:0}article.svelte-muf7m4.svelte-muf7m4{width:150px;background:rgba(0, 0, 0, 0.2);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:#fff;border-radius:1rem;padding:15px}article.svelte-muf7m4 img.svelte-muf7m4{width:50px;height:50px;-o-object-fit:contain;object-fit:contain;margin-right:10px}article.svelte-muf7m4 small.svelte-muf7m4{color:var(--grey-light)}.active.svelte-muf7m4.svelte-muf7m4{background:var(--bg-card-active)}",
      map: null
    };
    Hours = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $selectedHour, $$unsubscribe_selectedHour;
      $$unsubscribe_selectedHour = subscribe(selectedHour, (value) => $selectedHour = value);
      let { hours } = $$props;
      new Date().getHours();
      if ($$props.hours === void 0 && $$bindings.hours && hours !== void 0)
        $$bindings.hours(hours);
      $$result.css.add(css$23);
      $$unsubscribe_selectedHour();
      return `<ul class="${"slider svelte-muf7m4"}">${each(hours, (hour, i2) => {
        return `<li class="${"slide svelte-muf7m4"}"><article class="${["row acenter svelte-muf7m4", $selectedHour === i2 ? "active" : ""].join(" ").trim()}"><img${add_attribute("src", hour.icon, 0)}${add_attribute("alt", hour.condition, 0)} class="${"svelte-muf7m4"}">

				<div class="${"col"}"><small class="${"svelte-muf7m4"}">${escape(i2)}:00h</small>
					<h2>${escape(hour.temp.celsius)}\xBA</h2>
				</div></article>
		</li>`;
      })}
</ul>`;
    });
    css$13 = {
      code: ".wrapper.svelte-n3kyv8.svelte-n3kyv8{padding:20px;padding-bottom:100px}article.svelte-n3kyv8.svelte-n3kyv8{color:#fff;padding:20px;padding-left:0}header.svelte-n3kyv8.svelte-n3kyv8{gap:20px}header.svelte-n3kyv8 p.svelte-n3kyv8{font-size:12px}",
      map: null
    };
    Days = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { forecast } = $$props;
      const comingDays = forecast.slice(1, 3);
      const getHour = new Date().getHours();
      if ($$props.forecast === void 0 && $$bindings.forecast && forecast !== void 0)
        $$bindings.forecast(forecast);
      $$result.css.add(css$13);
      return `<div class="${"wrapper col xfill svelte-n3kyv8"}"><ul class="${"col xfill"}">${each(comingDays, ({ date, hour }, i2) => {
        return `<li class="${"row xfill"}"><article class="${"row jbetween acenter xfill svelte-n3kyv8"}"><header class="${"row acenter svelte-n3kyv8"}"><img${add_attribute("src", hour[getHour].icon, 0)}${add_attribute("alt", hour[getHour].condition, 0)}>

						<div class="${"col"}"><h3>${escape(i2 === 0 ? "Tomorrow" : "In 2 days")}</h3>
							<p class="${"svelte-n3kyv8"}">${escape(hour[getHour].condition)}</p>
						</div></header>

					<h2>${escape(hour[getHour].temp.celsius)}\xBA</h2></article>
			</li>`;
      })}</ul>
</div>`;
    });
    css10 = {
      code: ".scroll.svelte-cyw15g{transform:translateY(calc(100% - 100px));z-index:1;-webkit-animation:svelte-cyw15g-fromBottom 500ms ease-out;animation:svelte-cyw15g-fromBottom 500ms ease-out;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}@-webkit-keyframes svelte-cyw15g-fromBottom{to{opacity:1;transform:translateY(0)}}@keyframes svelte-cyw15g-fromBottom{to{opacity:1;transform:translateY(0)}}",
      map: null
    };
    U5Bcityu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let currentWeather;
      let $condition, $$unsubscribe_condition;
      let $selectedHour, $$unsubscribe_selectedHour;
      let $navVisible, $$unsubscribe_navVisible;
      $$unsubscribe_condition = subscribe(condition, (value) => $condition = value);
      $$unsubscribe_selectedHour = subscribe(selectedHour, (value) => $selectedHour = value);
      $$unsubscribe_navVisible = subscribe(navVisible, (value) => $navVisible = value);
      set_store_value(navVisible, $navVisible = true, $navVisible);
      let { data } = $$props;
      const { location, forecast } = data;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$result.css.add(css10);
      currentWeather = forecast[0].hour[$selectedHour];
      {
        if (currentWeather)
          set_store_value(condition, $condition = normalizedCondition(currentWeather.condition), $condition);
      }
      $$unsubscribe_condition();
      $$unsubscribe_selectedHour();
      $$unsubscribe_navVisible();
      return `<div class="${"scroll svelte-cyw15g"}"><div class="${"wrapper col xfill"}">${!forecast ? `<h1>Error loading data. Try again</h1>` : `${validate_component(Stats, "Stats").$$render($$result, { location, currentWeather }, {}, {})}
			${validate_component(Hours, "Hours").$$render($$result, { hours: forecast[0].hour }, {}, {})}
			${validate_component(Days, "Days").$$render($$result, { forecast }, {}, {})}`}</div>
</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports6 = {};
__export(__exports6, {
  css: () => css11,
  entry: () => entry6,
  js: () => js6,
  module: () => city_svelte_exports
});
var entry6, js6, css11;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_city_svelte();
    entry6 = "pages/address/_city_.svelte-0396cfa7.js";
    js6 = ["pages/address/_city_.svelte-0396cfa7.js", "chunks/index-66bb8367.js", "chunks/stores-225cf51e.js", "chunks/index-13b285a7.js", "chunks/utils-2cacb67e.js"];
    css11 = ["assets/pages/address/_city_.svelte-5978a40c.css"];
  }
});

// .svelte-kit/output/server/entries/endpoints/address/_city_.ts.js
var city_ts_exports = {};
__export(city_ts_exports, {
  get: () => get
});
async function get({ params }) {
  const { city } = params;
  const data = await getWeatherFrom(city);
  return {
    status: 200,
    body: {
      data
    }
  };
}
var init_city_ts = __esm({
  ".svelte-kit/output/server/entries/endpoints/address/_city_.ts.js"() {
    init_utils_67530605();
  }
});

// .svelte-kit/vercel-tmp/serverless.js
var serverless_exports = {};
__export(serverless_exports, {
  default: () => serverless_default
});
module.exports = __toCommonJS(serverless_exports);
init_install_fetch();

// node_modules/@sveltejs/kit/dist/node.js
var import_stream = require("stream");
function get_raw_body(req) {
  return new Promise((fulfil, reject) => {
    const h2 = req.headers;
    if (!h2["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h2["content-length"]);
    if (isNaN(length) && h2["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}
async function getRequest(base2, req) {
  let headers = req.headers;
  if (req.httpVersionMajor === 2) {
    headers = Object.assign({}, headers);
    delete headers[":method"];
    delete headers[":path"];
    delete headers[":authority"];
    delete headers[":scheme"];
  }
  return new Request(base2 + req.url, {
    method: req.method,
    headers,
    body: await get_raw_body(req)
  });
}
async function setResponse(res, response) {
  const headers = Object.fromEntries(response.headers);
  if (response.headers.has("set-cookie")) {
    headers["set-cookie"] = response.headers.raw()["set-cookie"];
  }
  res.writeHead(response.status, headers);
  if (response.body instanceof import_stream.Readable) {
    response.body.pipe(res);
  } else {
    if (response.body) {
      res.write(await response.arrayBuffer());
    }
    res.end();
  }
}

// .svelte-kit/output/server/index.js
init_index_0ebd485b();
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp2(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  {
    stores.page.set(page);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => {
      return `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => {
          return `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`;
        }
      })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
function to_headers(object) {
  const headers = new Headers();
  if (object) {
    for (const key2 in object) {
      const value = object[key2];
      if (!value)
        continue;
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          headers.append(key2, value2);
        });
      } else {
        headers.set(key2, value);
      }
    }
  }
  return headers;
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key2 in obj) {
    clone2[key2.toLowerCase()] = obj[key2];
  }
  return clone2;
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = params[key2].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function is_pojo(body) {
  if (typeof body !== "object")
    return false;
  if (body) {
    if (body instanceof Uint8Array)
      return false;
    if (body._readableState && typeof body.pipe === "function")
      return false;
    if (typeof ReadableStream !== "undefined" && body instanceof ReadableStream)
      return false;
  }
  return true;
}
function normalize_request_method(event) {
  const method = event.request.method.toLowerCase();
  return method === "delete" ? "del" : method;
}
function error(body) {
  return new Response(body, {
    status: 500
  });
}
function is_string(s22) {
  return typeof s22 === "string" || s22 instanceof String;
}
var text_types = /* @__PURE__ */ new Set([
  "application/xml",
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data"
]);
function is_text(content_type) {
  if (!content_type)
    return true;
  const type = content_type.split(";")[0].toLowerCase();
  return type.startsWith("text/") || type.endsWith("+xml") || text_types.has(type);
}
async function render_endpoint(event, mod) {
  const method = normalize_request_method(event);
  let handler = mod[method];
  if (!handler && method === "head") {
    handler = mod.get;
  }
  if (!handler) {
    const allowed = [];
    for (const method2 in ["get", "post", "put", "patch"]) {
      if (mod[method2])
        allowed.push(method2.toUpperCase());
    }
    if (mod.del)
      allowed.push("DELETE");
    if (mod.get || mod.head)
      allowed.push("HEAD");
    return event.request.headers.get("x-sveltekit-load") ? new Response(void 0, {
      status: 204
    }) : new Response(`${event.request.method} method not allowed`, {
      status: 405,
      headers: {
        allow: allowed.join(", ")
      }
    });
  }
  const response = await handler(event);
  const preface = `Invalid response from route ${event.url.pathname}`;
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  if (response.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  const { status = 200, body = {} } = response;
  const headers = response.headers instanceof Headers ? new Headers(response.headers) : to_headers(response.headers);
  const type = headers.get("content-type");
  if (!is_text(type) && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if (is_pojo(body) && (!type || type.startsWith("application/json"))) {
    headers.set("content-type", "application/json; charset=utf-8");
    normalized_body = JSON.stringify(body);
  } else {
    normalized_body = body;
  }
  if ((typeof normalized_body === "string" || normalized_body instanceof Uint8Array) && !headers.has("etag")) {
    const cache_control = headers.get("cache-control");
    if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
      headers.set("etag", `"${hash(normalized_body)}"`);
    }
  }
  return new Response(method !== "head" ? normalized_body : void 0, {
    status,
    headers
  });
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key2) {
            return walk(thing[key2]);
          });
      }
    }
  }
  walk(value);
  var names = /* @__PURE__ */ new Map();
  Array.from(counts).filter(function(entry7) {
    return entry7[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry7, i2) {
    names.set(entry7[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i2) {
          return i2 in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key2) {
          return safeKey(key2) + ":" + stringify(thing[key2]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i2) {
            statements_1.push(name + "[" + i2 + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key2) {
            statements_1.push("" + name + safeProp(key2) + "=" + stringify(thing[key2]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escapeUnsafeChars(JSON.stringify(key2));
}
function safeProp(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? "." + key2 : "[" + escapeUnsafeChars(JSON.stringify(key2)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop3() {
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop3) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop3) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop3;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
var render_json_payload_script_dict = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var render_json_payload_script_regex = new RegExp(`[${Object.keys(render_json_payload_script_dict).join("")}]`, "g");
function render_json_payload_script(attrs, payload) {
  const safe_payload = JSON.stringify(payload).replace(render_json_payload_script_regex, (match) => render_json_payload_script_dict[match]);
  let safe_attrs = "";
  for (const [key2, value] of Object.entries(attrs)) {
    if (value === void 0)
      continue;
    safe_attrs += ` sveltekit:data-${key2}=${escape_html_attr(value)}`;
  }
  return `<script type="application/json"${safe_attrs}>${safe_payload}<\/script>`;
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(`[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`, "g");
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var s2 = JSON.stringify;
function create_prerendering_url_proxy(url) {
  return new Proxy(url, {
    get: (target, prop, receiver) => {
      if (prop === "search" || prop === "searchParams") {
        throw new Error(`Cannot access url.${prop} on a page with prerendering enabled`);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array = encode$1(data);
  for (let i2 = 0; i2 < array.length; i2 += 16) {
    const w = array.subarray(i2, i2 + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w[i22];
      } else {
        a = w[i22 + 1 & 15];
        b = w[i22 + 14 & 15];
        tmp = w[i22 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i22 & 15] + w[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a = bytes[i2 + 0];
    const b = bytes[i2 + 1];
    const c = bytes[i2 + 2];
    const d = bytes[i2 + 3];
    bytes[i2 + 0] = d;
    bytes[i2 + 1] = c;
    bytes[i2 + 2] = b;
    bytes[i2 + 3] = a;
  }
}
function encode$1(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l; i2 += 3) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars[bytes[i2] & 63];
  }
  if (i2 === l + 1) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var csp_ready;
var generate_nonce;
var generate_hash;
if (typeof crypto !== "undefined") {
  const array = new Uint8Array(16);
  generate_nonce = () => {
    crypto.getRandomValues(array);
    return base64(array);
  };
  generate_hash = sha256;
} else {
  const name = "crypto";
  csp_ready = import(name).then((crypto2) => {
    generate_nonce = () => {
      return crypto2.randomBytes(16).toString("base64");
    };
    generate_hash = (input) => {
      return crypto2.createHash("sha256").update(input, "utf-8").digest().toString("base64");
    };
  });
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var Csp = class {
  #use_hashes;
  #dev;
  #script_needs_csp;
  #style_needs_csp;
  #directives;
  #script_src;
  #style_src;
  constructor({ mode, directives }, { dev, prerender, needs_nonce }) {
    this.#use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.#directives = dev ? __spreadValues({}, directives) : directives;
    this.#dev = dev;
    const d = this.#directives;
    if (dev) {
      const effective_style_src2 = d["style-src"] || d["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    this.#script_src = [];
    this.#style_src = [];
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    if (this.script_needs_nonce || this.style_needs_nonce || needs_nonce) {
      this.nonce = generate_nonce();
    }
  }
  add_script(content) {
    if (this.#script_needs_csp) {
      if (this.#use_hashes) {
        this.#script_src.push(`sha256-${generate_hash(content)}`);
      } else if (this.#script_src.length === 0) {
        this.#script_src.push(`nonce-${this.nonce}`);
      }
    }
  }
  add_style(content) {
    if (this.#style_needs_csp) {
      if (this.#use_hashes) {
        this.#style_src.push(`sha256-${generate_hash(content)}`);
      } else if (this.#style_src.length === 0) {
        this.#style_src.push(`nonce-${this.nonce}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = __spreadValues({}, this.#directives);
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
var updated = __spreadProps(__spreadValues({}, readable(false)), {
  check: () => false
});
async function render_response({
  branch,
  options,
  state,
  $session,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  stuff
}) {
  if (state.prerender) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %svelte.nonce%");
    }
  }
  const stylesheets = new Set(options.manifest._.entry.css);
  const modulepreloads = new Set(options.manifest._.entry.js);
  const styles = /* @__PURE__ */ new Map();
  const serialized_data = [];
  let shadow_props;
  let rendered;
  let is_private = false;
  let cache;
  if (error2) {
    error2.stack = options.get_stack(error2);
  }
  if (resolve_opts.ssr) {
    branch.forEach(({ node, props: props2, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => stylesheets.add(url));
      if (node.js)
        node.js.forEach((url) => modulepreloads.add(url));
      if (node.styles)
        Object.entries(node.styles).forEach(([k, v]) => styles.set(k, v));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (props2)
        shadow_props = props2;
      cache = loaded == null ? void 0 : loaded.cache;
      is_private = (cache == null ? void 0 : cache.private) ?? uses_credentials;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session: __spreadProps(__spreadValues({}, session), {
          subscribe: (fn) => {
            is_private = (cache == null ? void 0 : cache.private) ?? true;
            return session.subscribe(fn);
          }
        }),
        updated
      },
      page: {
        error: error2,
        params: event.params,
        routeId: event.routeId,
        status,
        stuff,
        url: state.prerender ? create_prerendering_url_proxy(event.url) : event.url
      },
      components: branch.map(({ node }) => node.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    rendered = options.root.render(props);
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let { head, html: body } = rendered;
  const inlined_style = Array.from(styles.values()).join("\n");
  await csp_ready;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerender,
    needs_nonce: options.template_contains_nonce
  });
  const target = hash(body);
  const init_app = `
		import { start } from ${s2(options.prefix + options.manifest._.entry.file)};
		start({
			target: document.querySelector('[data-sveltekit-hydrate="${target}"]').parentNode,
			paths: ${s2(options.paths)},
			session: ${try_serialize($session, (error3) => {
    throw new Error(`Failed to serialize session data: ${error3.message}`);
  })},
			route: ${!!page_config.router},
			spa: ${!resolve_opts.ssr},
			trailing_slash: ${s2(options.trailing_slash)},
			hydrate: ${resolve_opts.ssr && page_config.hydrate ? `{
				status: ${status},
				error: ${serialize_error(error2)},
				nodes: [
					${(branch || []).map(({ node }) => `import(${s2(options.prefix + node.entry)})`).join(",\n						")}
				],
				params: ${devalue(event.params)},
				routeId: ${s2(event.routeId)}
			}` : "null"}
		});
	`;
  const init_service_worker = `
		if ('serviceWorker' in navigator) {
			addEventListener('load', () => {
				navigator.serviceWorker.register('${options.service_worker}');
			});
		}
	`;
  if (inlined_style) {
    const attributes = [];
    if (options.dev)
      attributes.push(" data-sveltekit");
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(inlined_style);
    head += `
	<style${attributes.join("")}>${inlined_style}</style>`;
  }
  head += Array.from(stylesheets).map((dep) => {
    const attributes = [
      'rel="stylesheet"',
      `href="${options.prefix + dep}"`
    ];
    if (csp.style_needs_nonce) {
      attributes.push(`nonce="${csp.nonce}"`);
    }
    if (styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    }
    return `
	<link ${attributes.join(" ")}>`;
  }).join("");
  if (page_config.router || page_config.hydrate) {
    head += Array.from(modulepreloads).map((dep) => `
	<link rel="modulepreload" href="${options.prefix + dep}">`).join("");
    const attributes = ['type="module"', `data-sveltekit-hydrate="${target}"`];
    csp.add_script(init_app);
    if (csp.script_needs_nonce) {
      attributes.push(`nonce="${csp.nonce}"`);
    }
    body += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
    body += serialized_data.map(({ url, body: body2, response }) => render_json_payload_script({ type: "data", url, body: typeof body2 === "string" ? hash(body2) : void 0 }, response)).join("\n	");
    if (shadow_props) {
      body += render_json_payload_script({ type: "props" }, shadow_props);
    }
  }
  if (options.service_worker) {
    csp.add_script(init_service_worker);
    head += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
  }
  if (state.prerender) {
    const http_equiv = [];
    const csp_headers = csp.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="max-age=${cache.maxage}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  const segments = event.url.pathname.slice(options.paths.base.length).split("/").slice(2);
  const assets2 = options.paths.assets || (segments.length > 0 ? segments.map(() => "..").join("/") : ".");
  const html = await resolve_opts.transformPage({
    html: options.template({ head, body, assets: assets2, nonce: csp.nonce })
  });
  const headers = new Headers({
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (cache) {
    headers.set("cache-control", `${is_private ? "private" : "public"}, max-age=${cache.maxage}`);
  }
  if (!options.floc) {
    headers.set("permissions-policy", "interest-cohort=()");
  }
  if (!state.prerender) {
    const csp_header = csp.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
  }
  return new Response(html, {
    status,
    headers
  });
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize(__spreadProps(__spreadValues({}, error2), { name, message, stack }));
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
var parse_1 = parse$1;
var serialize_1 = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;
  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key2 = str.slice(index, eqIdx).trim();
    if (obj[key2] === void 0) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key2] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (opt.maxAge != null) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e2) {
    return str;
  }
}
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValue = parts.shift().split("=");
  var name = nameValue.shift();
  var value = nameValue.join("=");
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e2) {
    console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e2);
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parse(input, options) {
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers && input.headers["set-cookie"]) {
    input = input.headers["set-cookie"];
  } else if (input.headers) {
    var sch = input.headers[Object.keys(input.headers).find(function(key2) {
      return key2.toLowerCase() === "set-cookie";
    })];
    if (!sch && input.headers.cookie && !options.silent) {
      console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
    }
    input = sch;
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!options.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
var parseString_1 = setCookie.exports.parseString = parseString;
var splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;
function normalize(loaded) {
  if (loaded.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  if ("maxage" in loaded) {
    throw new Error("maxage should be replaced with cache: { maxage }");
  }
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return { status: status || 500, error: new Error() };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.dependencies) {
    if (!Array.isArray(loaded.dependencies) || loaded.dependencies.some((dep) => typeof dep !== "string")) {
      return {
        status: 500,
        error: new Error('"dependencies" property returned from load() must be of type string[]')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
async function load_node({
  event,
  options,
  state,
  route,
  node,
  $session,
  stuff,
  is_error,
  is_leaf,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  const cookies = parse_1(event.request.headers.get("cookie") || "");
  const new_cookies = [];
  let loaded;
  const shadow = is_leaf ? await load_shadow_data(route, event, options, !!state.prerender) : {};
  if (shadow.cookies) {
    shadow.cookies.forEach((header) => {
      new_cookies.push(parseString_1(header));
    });
  }
  if (shadow.error) {
    loaded = {
      status: shadow.status,
      error: shadow.error
    };
  } else if (shadow.redirect) {
    loaded = {
      status: shadow.status,
      redirect: shadow.redirect
    };
  } else if (module2.load) {
    const load_input = {
      url: state.prerender ? create_prerendering_url_proxy(event.url) : event.url,
      params: event.params,
      props: shadow.body || {},
      routeId: event.routeId,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = __spreadValues({
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity
          }, opts);
        }
        opts.headers = new Headers(opts.headers);
        for (const [key2, value] of event.request.headers) {
          if (key2 !== "authorization" && key2 !== "cookie" && key2 !== "host" && key2 !== "if-none-match" && !opts.headers.has(key2)) {
            opts.headers.set(key2, value);
          }
        }
        const resolved = resolve(event.url.pathname, requested.split("?")[0]);
        let response;
        let dependency;
        const prefix = options.paths.assets || options.paths.base;
        const filename = decodeURIComponent(resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response = new Response(options.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response = await fetch(`${event.url.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            const authorization = event.request.headers.get("authorization");
            const combined_cookies = __spreadValues({}, cookies);
            for (const cookie2 of new_cookies) {
              if (!domain_matches(event.url.hostname, cookie2.domain))
                continue;
              if (!path_matches(resolved, cookie2.path))
                continue;
              combined_cookies[cookie2.name] = cookie2.value;
            }
            const cookie = Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
            if (cookie) {
              opts.headers.set("cookie", cookie);
            }
            if (authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          response = await respond(new Request(new URL(requested, event.url).href, __spreadProps(__spreadValues({}, opts), { credentials: void 0 })), options, __spreadProps(__spreadValues({}, state), {
            initiator: route
          }));
          if (state.prerender) {
            dependency = { response, body: null };
            state.prerender.dependencies.set(resolved, dependency);
          }
        } else {
          if (resolved.startsWith("//")) {
            requested = event.url.protocol + requested;
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${event.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            if (cookie)
              opts.headers.set("cookie", cookie);
          }
          const external_request = new Request(requested, opts);
          response = await options.hooks.externalFetch.call(null, external_request);
        }
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          new_cookies.push(...splitCookiesString_1(set_cookie).map((str) => parseString_1(str)));
        }
        const proxy = new Proxy(response, {
          get(response2, key2, _receiver) {
            async function text() {
              const body = await response2.text();
              const headers = {};
              for (const [key3, value] of response2.headers) {
                if (key3 !== "set-cookie" && key3 !== "etag") {
                  headers[key3] = value;
                }
              }
              if (!opts.body || typeof opts.body === "string") {
                const status_number = Number(response2.status);
                if (isNaN(status_number)) {
                  throw new Error(`response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`);
                }
                fetched.push({
                  url: requested,
                  body: opts.body,
                  response: {
                    status: status_number,
                    statusText: response2.statusText,
                    headers,
                    body
                  }
                });
              }
              if (dependency) {
                dependency.body = body;
              }
              return body;
            }
            if (key2 === "arrayBuffer") {
              return async () => {
                const buffer = await response2.arrayBuffer();
                if (dependency) {
                  dependency.body = new Uint8Array(buffer);
                }
                return buffer;
              };
            }
            if (key2 === "text") {
              return text;
            }
            if (key2 === "json") {
              return async () => {
                return JSON.parse(await text());
              };
            }
            return Reflect.get(response2, key2, response2);
          }
        });
        return proxy;
      },
      stuff: __spreadValues({}, stuff),
      status: is_error ? status ?? null : null,
      error: is_error ? error2 ?? null : null
    };
    if (options.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    loaded = await module2.load.call(null, load_input);
    if (!loaded) {
      throw new Error(`load function must return a value${options.dev ? ` (${node.entry})` : ""}`);
    }
  } else if (shadow.body) {
    loaded = {
      props: shadow.body
    };
  } else {
    loaded = {};
  }
  if (shadow.body && state.prerender) {
    const pathname = `${event.url.pathname.replace(/\/$/, "")}/__data.json`;
    const dependency = {
      response: new Response(void 0),
      body: JSON.stringify(shadow.body)
    };
    state.prerender.dependencies.set(pathname, dependency);
  }
  return {
    node,
    props: shadow.body,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers: new_cookies.map((new_cookie) => {
      const _a = new_cookie, { name, value } = _a, options2 = __objRest(_a, ["name", "value"]);
      return serialize_1(name, value, options2);
    }),
    uses_credentials
  };
}
async function load_shadow_data(route, event, options, prerender) {
  if (!route.shadow)
    return {};
  try {
    const mod = await route.shadow();
    if (prerender && (mod.post || mod.put || mod.del || mod.patch)) {
      throw new Error("Cannot prerender pages that have endpoints with mutative methods");
    }
    const method = normalize_request_method(event);
    const is_get = method === "head" || method === "get";
    const handler = method === "head" ? mod.head || mod.get : mod[method];
    if (!handler && !is_get) {
      return {
        status: 405,
        error: new Error(`${method} method not allowed`)
      };
    }
    const data = {
      status: 200,
      cookies: [],
      body: {}
    };
    if (!is_get) {
      const result = await handler(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers, body } = validate_shadow_output(result);
      data.status = status;
      add_cookies(data.cookies, headers);
      if (status >= 300 && status < 400) {
        data.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data;
      }
      data.body = body;
    }
    const get2 = method === "head" && mod.head || mod.get;
    if (get2) {
      const result = await get2(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers, body } = validate_shadow_output(result);
      add_cookies(data.cookies, headers);
      data.status = status;
      if (status >= 400) {
        data.error = new Error("Failed to load data");
        return data;
      }
      if (status >= 300) {
        data.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data;
      }
      data.body = __spreadValues(__spreadValues({}, body), data.body);
    }
    return data;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    return {
      status: 500,
      error: error2
    };
  }
}
function add_cookies(target, headers) {
  const cookies = headers["set-cookie"];
  if (cookies) {
    if (Array.isArray(cookies)) {
      target.push(...cookies);
    } else {
      target.push(cookies);
    }
  }
}
function validate_shadow_output(result) {
  const { status = 200, body = {} } = result;
  let headers = result.headers || {};
  if (headers instanceof Headers) {
    if (headers.has("set-cookie")) {
      throw new Error("Endpoint request handler cannot use Headers interface with Set-Cookie headers");
    }
  } else {
    headers = lowercase_keys(headers);
  }
  if (!is_pojo(body)) {
    throw new Error("Body returned from endpoint request handler must be a plain object");
  }
  return { status, headers, body };
}
async function respond_with_error({
  event,
  options,
  state,
  $session,
  status,
  error: error2,
  resolve_opts
}) {
  try {
    const branch = [];
    let stuff = {};
    if (resolve_opts.ssr) {
      const default_layout = await options.manifest._.nodes[0]();
      const default_error = await options.manifest._.nodes[1]();
      const layout_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_layout,
        $session,
        stuff: {},
        is_error: false,
        is_leaf: false
      });
      const error_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_error,
        $session,
        stuff: layout_loaded ? layout_loaded.stuff : {},
        is_error: true,
        is_leaf: false,
        status,
        error: error2
      });
      branch.push(layout_loaded, error_loaded);
      stuff = error_loaded.stuff;
    }
    return await render_response({
      options,
      state,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router
      },
      stuff,
      status,
      error: error2,
      branch,
      event,
      resolve_opts
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return new Response(error3.stack, {
      status: 500
    });
  }
}
async function respond$1(opts) {
  const { event, options, state, $session, route, resolve_opts } = opts;
  let nodes;
  if (!resolve_opts.ssr) {
    return await render_response(__spreadProps(__spreadValues({}, opts), {
      branch: [],
      page_config: {
        hydrate: true,
        router: true
      },
      status: 200,
      error: null,
      event,
      stuff: {}
    }));
  }
  try {
    nodes = await Promise.all(route.a.map((n) => n == void 0 ? n : options.manifest._.nodes[n]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return await respond_with_error({
      event,
      options,
      state,
      $session,
      status: 500,
      error: error3,
      resolve_opts
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (state.prerender) {
    const should_prerender = leaf.prerender ?? state.prerender.default;
    if (!should_prerender) {
      return new Response(void 0, {
        status: 204
      });
    }
  }
  let branch = [];
  let status = 200;
  let error2 = null;
  let set_cookie_headers = [];
  let stuff = {};
  ssr: {
    for (let i2 = 0; i2 < nodes.length; i2 += 1) {
      const node = nodes[i2];
      let loaded;
      if (node) {
        try {
          loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
            node,
            stuff,
            is_error: false,
            is_leaf: i2 === nodes.length - 1
          }));
          set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
          if (loaded.loaded.redirect) {
            return with_cookies(new Response(void 0, {
              status: loaded.loaded.status,
              headers: {
                location: loaded.loaded.redirect
              }
            }), set_cookie_headers);
          }
          if (loaded.loaded.error) {
            ({ status, error: error2 } = loaded.loaded);
          }
        } catch (err) {
          const e2 = coalesce_to_error(err);
          options.handle_error(e2, event);
          status = 500;
          error2 = e2;
        }
        if (loaded && !error2) {
          branch.push(loaded);
        }
        if (error2) {
          while (i2--) {
            if (route.b[i2]) {
              const index = route.b[i2];
              const error_node = await options.manifest._.nodes[index]();
              let node_loaded;
              let j = i2;
              while (!(node_loaded = branch[j])) {
                j -= 1;
              }
              try {
                const error_loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
                  node: error_node,
                  stuff: node_loaded.stuff,
                  is_error: true,
                  is_leaf: false,
                  status,
                  error: error2
                }));
                if (error_loaded.loaded.error) {
                  continue;
                }
                page_config = get_page_config(error_node.module, options);
                branch = branch.slice(0, j + 1).concat(error_loaded);
                stuff = __spreadValues(__spreadValues({}, node_loaded.stuff), error_loaded.stuff);
                break ssr;
              } catch (err) {
                const e2 = coalesce_to_error(err);
                options.handle_error(e2, event);
                continue;
              }
            }
          }
          return with_cookies(await respond_with_error({
            event,
            options,
            state,
            $session,
            status,
            error: error2,
            resolve_opts
          }), set_cookie_headers);
        }
      }
      if (loaded && loaded.loaded.stuff) {
        stuff = __spreadValues(__spreadValues({}, stuff), loaded.loaded.stuff);
      }
    }
  }
  try {
    return with_cookies(await render_response(__spreadProps(__spreadValues({}, opts), {
      stuff,
      event,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    })), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return with_cookies(await respond_with_error(__spreadProps(__spreadValues({}, opts), {
      status: 500,
      error: error3
    })), set_cookie_headers);
  }
}
function get_page_config(leaf, options) {
  if ("ssr" in leaf) {
    throw new Error("`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs/hooks#handle");
  }
  return {
    router: "router" in leaf ? !!leaf.router : options.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    set_cookie_headers.forEach((value) => {
      response.headers.append("set-cookie", value);
    });
  }
  return response;
}
async function render_page(event, route, options, state, resolve_opts) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  if (route.shadow) {
    const type = negotiate(event.request.headers.get("accept") || "text/html", [
      "text/html",
      "application/json"
    ]);
    if (type === "application/json") {
      return render_endpoint(event, await route.shadow());
    }
  }
  const $session = await options.hooks.getSession(event);
  return respond$1({
    event,
    options,
    state,
    $session,
    resolve_opts,
    route
  });
}
function negotiate(accept, types2) {
  const parts = accept.split(",").map((str, i2) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      return { type, subtype, q: +q, i: i2 };
    }
    throw new Error(`Invalid Accept header: ${accept}`);
  }).sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex((part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*"));
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function exec(match, names, types2, matchers) {
  const params = {};
  for (let i2 = 0; i2 < names.length; i2 += 1) {
    const name = names[i2];
    const type = types2[i2];
    const value = match[i2 + 1] || "";
    if (type) {
      const matcher = matchers[type];
      if (!matcher)
        throw new Error(`Missing "${type}" param matcher`);
      if (!matcher(value))
        return;
    }
    params[name] = value;
  }
  return params;
}
var DATA_SUFFIX = "/__data.json";
var default_transform = ({ html }) => html;
async function respond(request, options, state) {
  var _a, _b, _c;
  let url = new URL(request.url);
  const { parameter, allowed } = options.method_override;
  const method_override = (_a = url.searchParams.get(parameter)) == null ? void 0 : _a.toUpperCase();
  if (method_override) {
    if (request.method === "POST") {
      if (allowed.includes(method_override)) {
        request = new Proxy(request, {
          get: (target, property, _receiver) => {
            if (property === "method")
              return method_override;
            return Reflect.get(target, property, target);
          }
        });
      } else {
        const verb = allowed.length === 0 ? "enabled" : "allowed";
        const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs/configuration#methodoverride`;
        return new Response(body, {
          status: 400
        });
      }
    } else {
      throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
    }
  }
  let decoded = decodeURI(url.pathname);
  let route = null;
  let params = {};
  if (options.paths.base && !((_b = state.prerender) == null ? void 0 : _b.fallback)) {
    if (!decoded.startsWith(options.paths.base)) {
      return new Response(void 0, { status: 404 });
    }
    decoded = decoded.slice(options.paths.base.length) || "/";
  }
  const is_data_request = decoded.endsWith(DATA_SUFFIX);
  if (is_data_request) {
    decoded = decoded.slice(0, -DATA_SUFFIX.length) || "/";
    url = new URL(url.origin + url.pathname.slice(0, -DATA_SUFFIX.length) + url.search);
  }
  if (!state.prerender || !state.prerender.fallback) {
    const matchers = await options.manifest._.matchers();
    for (const candidate of options.manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.names, candidate.types, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  if ((route == null ? void 0 : route.type) === "page") {
    const normalized = normalize_path(url.pathname, options.trailing_slash);
    if (normalized !== url.pathname && !((_c = state.prerender) == null ? void 0 : _c.fallback)) {
      return new Response(void 0, {
        status: 301,
        headers: {
          "x-sveltekit-normalize": "1",
          location: (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
        }
      });
    }
  }
  const event = {
    get clientAddress() {
      if (!state.getClientAddress) {
        throw new Error(`${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`);
      }
      Object.defineProperty(event, "clientAddress", {
        value: state.getClientAddress()
      });
      return event.clientAddress;
    },
    locals: {},
    params,
    platform: state.platform,
    request,
    routeId: route && route.id,
    url
  };
  const removed = (property, replacement, suffix = "") => ({
    get: () => {
      throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix);
    }
  });
  const details = ". See https://github.com/sveltejs/kit/pull/3384 for details";
  const body_getter = {
    get: () => {
      throw new Error("To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`" + details);
    }
  };
  Object.defineProperties(event, {
    method: removed("method", "request.method", details),
    headers: removed("headers", "request.headers", details),
    origin: removed("origin", "url.origin"),
    path: removed("path", "url.pathname"),
    query: removed("query", "url.searchParams"),
    body: body_getter,
    rawBody: body_getter
  });
  let resolve_opts = {
    ssr: true,
    transformPage: default_transform
  };
  try {
    const response = await options.hooks.handle({
      event,
      resolve: async (event2, opts) => {
        if (opts) {
          resolve_opts = {
            ssr: opts.ssr !== false,
            transformPage: opts.transformPage || default_transform
          };
        }
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            event: event2,
            options,
            state,
            $session: await options.hooks.getSession(event2),
            page_config: { router: true, hydrate: true },
            stuff: {},
            status: 200,
            error: null,
            branch: [],
            resolve_opts: __spreadProps(__spreadValues({}, resolve_opts), {
              ssr: false
            })
          });
        }
        if (route) {
          let response2;
          if (is_data_request && route.type === "page" && route.shadow) {
            response2 = await render_endpoint(event2, await route.shadow());
            if (request.headers.has("x-sveltekit-load")) {
              if (response2.status >= 300 && response2.status < 400) {
                const location = response2.headers.get("location");
                if (location) {
                  const headers = new Headers(response2.headers);
                  headers.set("x-sveltekit-location", location);
                  response2 = new Response(void 0, {
                    status: 204,
                    headers
                  });
                }
              }
            }
          } else {
            response2 = route.type === "endpoint" ? await render_endpoint(event2, await route.load()) : await render_page(event2, route, options, state, resolve_opts);
          }
          if (response2) {
            if (response2.status === 200 && response2.headers.has("etag")) {
              let if_none_match_value = request.headers.get("if-none-match");
              if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
                if_none_match_value = if_none_match_value.substring(2);
              }
              const etag = response2.headers.get("etag");
              if (if_none_match_value === etag) {
                const headers = new Headers({ etag });
                for (const key2 of [
                  "cache-control",
                  "content-location",
                  "date",
                  "expires",
                  "vary"
                ]) {
                  const value = response2.headers.get(key2);
                  if (value)
                    headers.set(key2, value);
                }
                return new Response(void 0, {
                  status: 304,
                  headers
                });
              }
            }
            return response2;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(event2);
          return await respond_with_error({
            event: event2,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${event2.url.pathname}`),
            resolve_opts
          });
        }
        if (state.prerender) {
          return new Response("not found", { status: 404 });
        }
        return await fetch(request);
      },
      get request() {
        throw new Error("request in handle has been replaced with event" + details);
      }
    });
    if (response && !(response instanceof Response)) {
      throw new Error("handle must return a Response object" + details);
    }
    return response;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    try {
      const $session = await options.hooks.getSession(event);
      return await respond_with_error({
        event,
        options,
        state,
        $session,
        status: 500,
        error: error2,
        resolve_opts
      });
    } catch (e22) {
      const error3 = coalesce_to_error(e22);
      return new Response(options.dev ? error3.stack : error3.message, {
        status: 500
      });
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var template = ({ head, body, assets: assets2, nonce }) => '<!DOCTYPE html>\r\n<html lang="en">\r\n	<head>\r\n		<meta charset="utf-8" />\r\n		<meta\r\n			name="viewport"\r\n			content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"\r\n		/>\r\n		<!-- PWA -->\r\n		<meta name="mobile-web-app-capable" content="yes" />\r\n		<meta name="apple-mobile-web-app-capable" content="yes" />\r\n		<meta name="apple-mobile-web-app-status-bar-style" content="black" />\r\n		<meta name="theme-color" content="#000" />\r\n\r\n		<!-- Web assets -->\r\n		<link rel="manifest" href="/manifest.json" crossorigin="use-credentials" />\r\n		<meta name="apple-mobile-web-app-title" content="verdu" />\r\n		<link rel="apple-touch-icon" type="image/png" href="/mobile.png" />\r\n		<link rel="icon" type="image/png" href="/mobile.png" />\r\n		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />\r\n\r\n		<!-- SEO -->\r\n		<meta name="author" content="verdu | verdu@live.com" />\r\n\r\n		' + head + '\r\n	</head>\r\n\r\n	<body>\r\n		<div id="svelte">' + body + "</div>\r\n	</body>\r\n</html>\r\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var Server = class {
  constructor(manifest2) {
    this.options = {
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, event) => {
        this.options.hooks.handleError({
          error: error2,
          event,
          get request() {
            throw new Error("request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details");
          }
        });
        error2.stack = this.options.get_stack(error2);
      },
      hooks: null,
      hydrate: true,
      manifest: manifest2,
      method_override: { "parameter": "_method", "allowed": [] },
      paths: { base, assets },
      prefix: assets + "/_app/",
      prerender: true,
      read,
      root: Root,
      service_worker: base + "/service-worker.js",
      router: true,
      template,
      template_contains_nonce: false,
      trailing_slash: "never"
    };
  }
  async respond(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error("The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    if (!this.options.hooks) {
      const module2 = await Promise.resolve().then(() => (init_hooks_1c45ba0b(), hooks_1c45ba0b_exports));
      this.options.hooks = {
        getSession: module2.getSession || (() => ({})),
        handle: module2.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
        handleError: module2.handleError || (({ error: error2 }) => console.error(error2.stack)),
        externalFetch: module2.externalFetch || fetch
      };
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/vercel-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.png", "favicon.svg", "geolocation.svg", "home.svg", "imago.svg", "logo-192.png", "logo-512.png", "logo-w.svg", "logo.svg", "manifest.json", "mobile.png", "robots.txt", "search.svg", "settings.svg", "service-worker.js"]),
  mimeTypes: { ".png": "image/png", ".svg": "image/svg+xml", ".json": "application/json", ".txt": "text/plain" },
  _: {
    entry: { "file": "start-92fd0bda.js", "js": ["start-92fd0bda.js", "chunks/index-66bb8367.js", "chunks/index-13b285a7.js", "chunks/singletons-d1fb5791.js"], "css": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4)),
      () => Promise.resolve().then(() => (init__5(), __exports5)),
      () => Promise.resolve().then(() => (init__6(), __exports6))
    ],
    routes: [
      {
        type: "page",
        id: "",
        pattern: /^\/$/,
        names: [],
        types: [],
        path: "/",
        shadow: null,
        a: [0, 2],
        b: [1]
      },
      {
        type: "page",
        id: "search",
        pattern: /^\/search\/?$/,
        names: [],
        types: [],
        path: "/search",
        shadow: null,
        a: [0, 3],
        b: [1]
      },
      {
        type: "page",
        id: "settings",
        pattern: /^\/settings\/?$/,
        names: [],
        types: [],
        path: "/settings",
        shadow: null,
        a: [0, 4],
        b: [1]
      },
      {
        type: "page",
        id: "address/[city]",
        pattern: /^\/address\/([^/]+?)\/?$/,
        names: ["city"],
        types: [null],
        path: null,
        shadow: () => Promise.resolve().then(() => (init_city_ts(), city_ts_exports)),
        a: [0, 5],
        b: [1]
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};

// .svelte-kit/vercel-tmp/serverless.js
installFetch();
var server = new Server(manifest);
var serverless_default = async (req, res) => {
  let request;
  try {
    request = await getRequest(`https://${req.headers.host}`, req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  setResponse(res, await server.respond(request, {
    getClientAddress() {
      return request.headers.get("x-forwarded-for");
    }
  }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
