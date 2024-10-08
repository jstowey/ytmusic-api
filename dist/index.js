"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/YTMusic.ts
var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);
var _toughcookie = require('tough-cookie');

// src/constants.ts
var FE_MUSIC_HOME = "FEmusic_home";

// src/types.ts
var _zod = require('zod');
var ThumbnailFull = _zod.z.object({
  url: _zod.z.string(),
  width: _zod.z.number(),
  height: _zod.z.number()
}).strict();
var ArtistBasic = _zod.z.object({
  artistId: _zod.z.nullable(_zod.z.string()),
  name: _zod.z.string()
}).strict();
var AlbumBasic = _zod.z.object({
  albumId: _zod.z.string(),
  name: _zod.z.string()
}).strict();
var SongDetailed = _zod.z.object({
  type: _zod.z.literal("SONG"),
  videoId: _zod.z.string(),
  name: _zod.z.string(),
  artist: ArtistBasic,
  album: _zod.z.nullable(AlbumBasic),
  duration: _zod.z.nullable(_zod.z.number()),
  thumbnails: _zod.z.array(ThumbnailFull)
}).strict();
var VideoDetailed = _zod.z.object({
  type: _zod.z.literal("VIDEO"),
  videoId: _zod.z.string(),
  name: _zod.z.string(),
  artist: ArtistBasic,
  duration: _zod.z.nullable(_zod.z.number()),
  thumbnails: _zod.z.array(ThumbnailFull)
}).strict();
var ArtistDetailed = _zod.z.object({
  artistId: _zod.z.string(),
  name: _zod.z.string(),
  type: _zod.z.literal("ARTIST"),
  thumbnails: _zod.z.array(ThumbnailFull)
}).strict();
var AlbumDetailed = _zod.z.object({
  type: _zod.z.literal("ALBUM"),
  albumId: _zod.z.string(),
  playlistId: _zod.z.string(),
  name: _zod.z.string(),
  artist: ArtistBasic,
  year: _zod.z.nullable(_zod.z.number()),
  thumbnails: _zod.z.array(ThumbnailFull)
}).strict();
var PlaylistDetailed = _zod.z.object({
  type: _zod.z.literal("PLAYLIST"),
  playlistId: _zod.z.string(),
  name: _zod.z.string(),
  artist: ArtistBasic,
  thumbnails: _zod.z.array(ThumbnailFull)
}).strict();
var SongFull = _zod.z.object({
  type: _zod.z.literal("SONG"),
  videoId: _zod.z.string(),
  name: _zod.z.string(),
  artist: ArtistBasic,
  duration: _zod.z.number(),
  thumbnails: _zod.z.array(ThumbnailFull),
  formats: _zod.z.array(_zod.z.any()),
  adaptiveFormats: _zod.z.array(_zod.z.any())
}).strict();
var VideoFull = _zod.z.object({
  type: _zod.z.literal("VIDEO"),
  videoId: _zod.z.string(),
  name: _zod.z.string(),
  artist: ArtistBasic,
  duration: _zod.z.number(),
  thumbnails: _zod.z.array(ThumbnailFull),
  unlisted: _zod.z.boolean(),
  familySafe: _zod.z.boolean(),
  paid: _zod.z.boolean(),
  tags: _zod.z.array(_zod.z.string())
}).strict();
var ArtistFull = _zod.z.object({
  artistId: _zod.z.string(),
  name: _zod.z.string(),
  type: _zod.z.literal("ARTIST"),
  thumbnails: _zod.z.array(ThumbnailFull),
  topSongs: _zod.z.array(SongDetailed),
  topAlbums: _zod.z.array(AlbumDetailed),
  topSingles: _zod.z.array(AlbumDetailed),
  topVideos: _zod.z.array(VideoDetailed),
  featuredOn: _zod.z.array(PlaylistDetailed),
  similarArtists: _zod.z.array(ArtistDetailed)
}).strict();
var AlbumFull = _zod.z.object({
  type: _zod.z.literal("ALBUM"),
  albumId: _zod.z.string(),
  playlistId: _zod.z.string(),
  name: _zod.z.string(),
  artist: ArtistBasic,
  year: _zod.z.nullable(_zod.z.number()),
  thumbnails: _zod.z.array(ThumbnailFull),
  songs: _zod.z.array(SongDetailed)
}).strict();
var PlaylistFull = _zod.z.object({
  type: _zod.z.literal("PLAYLIST"),
  playlistId: _zod.z.string(),
  name: _zod.z.string(),
  artist: ArtistBasic,
  videoCount: _zod.z.number(),
  thumbnails: _zod.z.array(ThumbnailFull)
}).strict();
var SearchResult = _zod.z.discriminatedUnion("type", [
  SongDetailed,
  VideoDetailed,
  AlbumDetailed,
  ArtistDetailed,
  PlaylistDetailed
]);
var HomeSection = _zod.z.object({
  title: _zod.z.string(),
  contents: _zod.z.array(_zod.z.union([AlbumDetailed, PlaylistDetailed, SongDetailed]))
}).strict();

// node_modules/zod-to-json-schema/dist/esm/Options.js
var ignoreOverride = Symbol("Let zodToJsonSchema decide on which parser to use");
var defaultOptions = {
  name: void 0,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: false,
  definitions: {},
  errorMessages: false,
  markdownDescription: false,
  patternStrategy: "escape",
  applyRegexFlags: false,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref"
};
var getDefaultOptions = (options) => typeof options === "string" ? {
  ...defaultOptions,
  name: options
} : {
  ...defaultOptions,
  ...options
};

// node_modules/zod-to-json-schema/dist/esm/Refs.js
var getRefs = (options) => {
  const _options = getDefaultOptions(options);
  const currentPath = _options.name !== void 0 ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
  return {
    ..._options,
    currentPath,
    propertyPath: void 0,
    seen: new Map(Object.entries(_options.definitions).map(([name, def]) => [
      def._def,
      {
        def: def._def,
        path: [..._options.basePath, _options.definitionPath, name],
        // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
        jsonSchema: void 0
      }
    ]))
  };
};

// node_modules/zod-to-json-schema/dist/esm/errorMessages.js
function addErrorMessage(res, key, errorMessage, refs) {
  if (!_optionalChain([refs, 'optionalAccess', _2 => _2.errorMessages]))
    return;
  if (errorMessage) {
    res.errorMessage = {
      ...res.errorMessage,
      [key]: errorMessage
    };
  }
}
function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
  res[key] = value;
  addErrorMessage(res, key, errorMessage, refs);
}

// node_modules/zod-to-json-schema/dist/esm/parseDef.js


// node_modules/zod-to-json-schema/dist/esm/parsers/any.js
function parseAnyDef() {
  return {};
}

// node_modules/zod-to-json-schema/dist/esm/parsers/array.js

function parseArrayDef(def, refs) {
  const res = {
    type: "array"
  };
  if (_optionalChain([def, 'access', _3 => _3.type, 'optionalAccess', _4 => _4._def, 'optionalAccess', _5 => _5.typeName]) !== _zod.ZodFirstPartyTypeKind.ZodAny) {
    res.items = parseDef(def.type._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items"]
    });
  }
  if (def.minLength) {
    setResponseValueAndErrors(res, "minItems", def.minLength.value, def.minLength.message, refs);
  }
  if (def.maxLength) {
    setResponseValueAndErrors(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
  }
  if (def.exactLength) {
    setResponseValueAndErrors(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
    setResponseValueAndErrors(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js
function parseBigintDef(def, refs) {
  const res = {
    type: "integer",
    format: "int64"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js
function parseBooleanDef() {
  return {
    type: "boolean"
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/branded.js
function parseBrandedDef(_def, refs) {
  return parseDef(_def.type._def, refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/catch.js
var parseCatchDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};

// node_modules/zod-to-json-schema/dist/esm/parsers/date.js
function parseDateDef(def, refs, overrideDateStrategy) {
  const strategy = _nullishCoalesce(overrideDateStrategy, () => ( refs.dateStrategy));
  if (Array.isArray(strategy)) {
    return {
      anyOf: strategy.map((item, i) => parseDateDef(def, refs, item))
    };
  }
  switch (strategy) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return integerDateParser(def, refs);
  }
}
var integerDateParser = (def, refs) => {
  const res = {
    type: "integer",
    format: "unix-time"
  };
  if (refs.target === "openApi3") {
    return res;
  }
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        setResponseValueAndErrors(
          res,
          "minimum",
          check.value,
          // This is in milliseconds
          check.message,
          refs
        );
        break;
      case "max":
        setResponseValueAndErrors(
          res,
          "maximum",
          check.value,
          // This is in milliseconds
          check.message,
          refs
        );
        break;
    }
  }
  return res;
};

// node_modules/zod-to-json-schema/dist/esm/parsers/default.js
function parseDefaultDef(_def, refs) {
  return {
    ...parseDef(_def.innerType._def, refs),
    default: _def.defaultValue()
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/effects.js
function parseEffectsDef(_def, refs) {
  return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : {};
}

// node_modules/zod-to-json-schema/dist/esm/parsers/enum.js
function parseEnumDef(def) {
  return {
    type: "string",
    enum: def.values
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js
var isJsonSchema7AllOfType = (type) => {
  if ("type" in type && type.type === "string")
    return false;
  return "allOf" in type;
};
function parseIntersectionDef(def, refs) {
  const allOf = [
    parseDef(def.left._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "0"]
    }),
    parseDef(def.right._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "1"]
    })
  ].filter((x) => !!x);
  let unevaluatedProperties = refs.target === "jsonSchema2019-09" ? { unevaluatedProperties: false } : void 0;
  const mergedAllOf = [];
  allOf.forEach((schema) => {
    if (isJsonSchema7AllOfType(schema)) {
      mergedAllOf.push(...schema.allOf);
      if (schema.unevaluatedProperties === void 0) {
        unevaluatedProperties = void 0;
      }
    } else {
      let nestedSchema = schema;
      if ("additionalProperties" in schema && schema.additionalProperties === false) {
        const { additionalProperties, ...rest } = schema;
        nestedSchema = rest;
      } else {
        unevaluatedProperties = void 0;
      }
      mergedAllOf.push(nestedSchema);
    }
  });
  return mergedAllOf.length ? {
    allOf: mergedAllOf,
    ...unevaluatedProperties
  } : void 0;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/literal.js
function parseLiteralDef(def, refs) {
  const parsedType = typeof def.value;
  if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
    return {
      type: Array.isArray(def.value) ? "array" : "object"
    };
  }
  if (refs.target === "openApi3") {
    return {
      type: parsedType === "bigint" ? "integer" : parsedType,
      enum: [def.value]
    };
  }
  return {
    type: parsedType === "bigint" ? "integer" : parsedType,
    const: def.value
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/record.js


// node_modules/zod-to-json-schema/dist/esm/parsers/string.js
var emojiRegex;
var zodPatterns = {
  /**
   * `c` was changed to `[cC]` to replicate /i flag
   */
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  /**
   * `a-z` was added to replicate /i flag
   */
  email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  /**
   * Constructed a valid Unicode RegExp
   *
   * Lazily instantiate since this type of regex isn't supported
   * in all envs (e.g. React Native).
   *
   * See:
   * https://github.com/colinhacks/zod/issues/2433
   * Fix in Zod:
   * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
   */
  emoji: () => {
    if (emojiRegex === void 0) {
      emojiRegex = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
    }
    return emojiRegex;
  },
  /**
   * Unused
   */
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  /**
   * Unused
   */
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  /**
   * Unused
   */
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/
};
function parseStringDef(def, refs) {
  const res = {
    type: "string"
  };
  function processPattern(value) {
    return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(value) : value;
  }
  if (def.checks) {
    for (const check of def.checks) {
      switch (check.kind) {
        case "min":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          break;
        case "max":
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "email":
          switch (refs.emailStrategy) {
            case "format:email":
              addFormat(res, "email", check.message, refs);
              break;
            case "format:idn-email":
              addFormat(res, "idn-email", check.message, refs);
              break;
            case "pattern:zod":
              addPattern(res, zodPatterns.email, check.message, refs);
              break;
          }
          break;
        case "url":
          addFormat(res, "uri", check.message, refs);
          break;
        case "uuid":
          addFormat(res, "uuid", check.message, refs);
          break;
        case "regex":
          addPattern(res, check.regex, check.message, refs);
          break;
        case "cuid":
          addPattern(res, zodPatterns.cuid, check.message, refs);
          break;
        case "cuid2":
          addPattern(res, zodPatterns.cuid2, check.message, refs);
          break;
        case "startsWith":
          addPattern(res, RegExp(`^${processPattern(check.value)}`), check.message, refs);
          break;
        case "endsWith":
          addPattern(res, RegExp(`${processPattern(check.value)}$`), check.message, refs);
          break;
        case "datetime":
          addFormat(res, "date-time", check.message, refs);
          break;
        case "date":
          addFormat(res, "date", check.message, refs);
          break;
        case "time":
          addFormat(res, "time", check.message, refs);
          break;
        case "duration":
          addFormat(res, "duration", check.message, refs);
          break;
        case "length":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "includes": {
          addPattern(res, RegExp(processPattern(check.value)), check.message, refs);
          break;
        }
        case "ip": {
          if (check.version !== "v6") {
            addFormat(res, "ipv4", check.message, refs);
          }
          if (check.version !== "v4") {
            addFormat(res, "ipv6", check.message, refs);
          }
          break;
        }
        case "emoji":
          addPattern(res, zodPatterns.emoji, check.message, refs);
          break;
        case "ulid": {
          addPattern(res, zodPatterns.ulid, check.message, refs);
          break;
        }
        case "base64": {
          switch (refs.base64Strategy) {
            case "format:binary": {
              addFormat(res, "binary", check.message, refs);
              break;
            }
            case "contentEncoding:base64": {
              setResponseValueAndErrors(res, "contentEncoding", "base64", check.message, refs);
              break;
            }
            case "pattern:zod": {
              addPattern(res, zodPatterns.base64, check.message, refs);
              break;
            }
          }
          break;
        }
        case "nanoid": {
          addPattern(res, zodPatterns.nanoid, check.message, refs);
        }
        case "toLowerCase":
        case "toUpperCase":
        case "trim":
          break;
        default:
          /* @__PURE__ */ ((_) => {
          })(check);
      }
    }
  }
  return res;
}
var escapeNonAlphaNumeric = (value) => Array.from(value).map((c) => /[a-zA-Z0-9]/.test(c) ? c : `\\${c}`).join("");
var addFormat = (schema, value, message, refs) => {
  if (schema.format || _optionalChain([schema, 'access', _6 => _6.anyOf, 'optionalAccess', _7 => _7.some, 'call', _8 => _8((x) => x.format)])) {
    if (!schema.anyOf) {
      schema.anyOf = [];
    }
    if (schema.format) {
      schema.anyOf.push({
        format: schema.format,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { format: schema.errorMessage.format }
        }
      });
      delete schema.format;
      if (schema.errorMessage) {
        delete schema.errorMessage.format;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.anyOf.push({
      format: value,
      ...message && refs.errorMessages && { errorMessage: { format: message } }
    });
  } else {
    setResponseValueAndErrors(schema, "format", value, message, refs);
  }
};
var addPattern = (schema, regex, message, refs) => {
  if (schema.pattern || _optionalChain([schema, 'access', _9 => _9.allOf, 'optionalAccess', _10 => _10.some, 'call', _11 => _11((x) => x.pattern)])) {
    if (!schema.allOf) {
      schema.allOf = [];
    }
    if (schema.pattern) {
      schema.allOf.push({
        pattern: schema.pattern,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { pattern: schema.errorMessage.pattern }
        }
      });
      delete schema.pattern;
      if (schema.errorMessage) {
        delete schema.errorMessage.pattern;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.allOf.push({
      pattern: processRegExp(regex, refs),
      ...message && refs.errorMessages && { errorMessage: { pattern: message } }
    });
  } else {
    setResponseValueAndErrors(schema, "pattern", processRegExp(regex, refs), message, refs);
  }
};
var processRegExp = (regexOrFunction, refs) => {
  const regex = typeof regexOrFunction === "function" ? regexOrFunction() : regexOrFunction;
  if (!refs.applyRegexFlags || !regex.flags)
    return regex.source;
  const flags = {
    i: regex.flags.includes("i"),
    m: regex.flags.includes("m"),
    s: regex.flags.includes("s")
    // `.` matches newlines
  };
  const source = flags.i ? regex.source.toLowerCase() : regex.source;
  let pattern = "";
  let isEscaped = false;
  let inCharGroup = false;
  let inCharRange = false;
  for (let i = 0; i < source.length; i++) {
    if (isEscaped) {
      pattern += source[i];
      isEscaped = false;
      continue;
    }
    if (flags.i) {
      if (inCharGroup) {
        if (source[i].match(/[a-z]/)) {
          if (inCharRange) {
            pattern += source[i];
            pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
            inCharRange = false;
          } else if (source[i + 1] === "-" && _optionalChain([source, 'access', _12 => _12[i + 2], 'optionalAccess', _13 => _13.match, 'call', _14 => _14(/[a-z]/)])) {
            pattern += source[i];
            inCharRange = true;
          } else {
            pattern += `${source[i]}${source[i].toUpperCase()}`;
          }
          continue;
        }
      } else if (source[i].match(/[a-z]/)) {
        pattern += `[${source[i]}${source[i].toUpperCase()}]`;
        continue;
      }
    }
    if (flags.m) {
      if (source[i] === "^") {
        pattern += `(^|(?<=[\r
]))`;
        continue;
      } else if (source[i] === "$") {
        pattern += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (flags.s && source[i] === ".") {
      pattern += inCharGroup ? `${source[i]}\r
` : `[${source[i]}\r
]`;
      continue;
    }
    pattern += source[i];
    if (source[i] === "\\") {
      isEscaped = true;
    } else if (inCharGroup && source[i] === "]") {
      inCharGroup = false;
    } else if (!inCharGroup && source[i] === "[") {
      inCharGroup = true;
    }
  }
  try {
    const regexTest = new RegExp(pattern);
  } catch (e) {
    console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`);
    return regex.source;
  }
  return pattern;
};

// node_modules/zod-to-json-schema/dist/esm/parsers/record.js
function parseRecordDef(def, refs) {
  if (refs.target === "openApi3" && _optionalChain([def, 'access', _15 => _15.keyType, 'optionalAccess', _16 => _16._def, 'access', _17 => _17.typeName]) === _zod.ZodFirstPartyTypeKind.ZodEnum) {
    return {
      type: "object",
      required: def.keyType._def.values,
      properties: def.keyType._def.values.reduce((acc, key) => ({
        ...acc,
        [key]: _nullishCoalesce(parseDef(def.valueType._def, {
          ...refs,
          currentPath: [...refs.currentPath, "properties", key]
        }), () => ( {}))
      }), {}),
      additionalProperties: false
    };
  }
  const schema = {
    type: "object",
    additionalProperties: _nullishCoalesce(parseDef(def.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }), () => ( {}))
  };
  if (refs.target === "openApi3") {
    return schema;
  }
  if (_optionalChain([def, 'access', _18 => _18.keyType, 'optionalAccess', _19 => _19._def, 'access', _20 => _20.typeName]) === _zod.ZodFirstPartyTypeKind.ZodString && _optionalChain([def, 'access', _21 => _21.keyType, 'access', _22 => _22._def, 'access', _23 => _23.checks, 'optionalAccess', _24 => _24.length])) {
    const keyType = Object.entries(parseStringDef(def.keyType._def, refs)).reduce((acc, [key, value]) => key === "type" ? acc : { ...acc, [key]: value }, {});
    return {
      ...schema,
      propertyNames: keyType
    };
  } else if (_optionalChain([def, 'access', _25 => _25.keyType, 'optionalAccess', _26 => _26._def, 'access', _27 => _27.typeName]) === _zod.ZodFirstPartyTypeKind.ZodEnum) {
    return {
      ...schema,
      propertyNames: {
        enum: def.keyType._def.values
      }
    };
  }
  return schema;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/map.js
function parseMapDef(def, refs) {
  if (refs.mapStrategy === "record") {
    return parseRecordDef(def, refs);
  }
  const keys = parseDef(def.keyType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "0"]
  }) || {};
  const values = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "1"]
  }) || {};
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [keys, values],
      minItems: 2,
      maxItems: 2
    }
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js
function parseNativeEnumDef(def) {
  const object = def.values;
  const actualKeys = Object.keys(def.values).filter((key) => {
    return typeof object[object[key]] !== "number";
  });
  const actualValues = actualKeys.map((key) => object[key]);
  const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
  return {
    type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: actualValues
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/never.js
function parseNeverDef() {
  return {
    not: {}
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/null.js
function parseNullDef(refs) {
  return refs.target === "openApi3" ? {
    enum: ["null"],
    nullable: true
  } : {
    type: "null"
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/union.js
var primitiveMappings = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function parseUnionDef(def, refs) {
  if (refs.target === "openApi3")
    return asAnyOf(def, refs);
  const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
  if (options.every((x) => x._def.typeName in primitiveMappings && (!x._def.checks || !x._def.checks.length))) {
    const types = options.reduce((types2, x) => {
      const type = primitiveMappings[x._def.typeName];
      return type && !types2.includes(type) ? [...types2, type] : types2;
    }, []);
    return {
      type: types.length > 1 ? types : types[0]
    };
  } else if (options.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
    const types = options.reduce((acc, x) => {
      const type = typeof x._def.value;
      switch (type) {
        case "string":
        case "number":
        case "boolean":
          return [...acc, type];
        case "bigint":
          return [...acc, "integer"];
        case "object":
          if (x._def.value === null)
            return [...acc, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return acc;
      }
    }, []);
    if (types.length === options.length) {
      const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
      return {
        type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
        enum: options.reduce((acc, x) => {
          return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
        }, [])
      };
    }
  } else if (options.every((x) => x._def.typeName === "ZodEnum")) {
    return {
      type: "string",
      enum: options.reduce((acc, x) => [
        ...acc,
        ...x._def.values.filter((x2) => !acc.includes(x2))
      ], [])
    };
  }
  return asAnyOf(def, refs);
}
var asAnyOf = (def, refs) => {
  const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x, i) => parseDef(x._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", `${i}`]
  })).filter((x) => !!x && (!refs.strictUnions || typeof x === "object" && Object.keys(x).length > 0));
  return anyOf.length ? { anyOf } : void 0;
};

// node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js
function parseNullableDef(def, refs) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
    if (refs.target === "openApi3") {
      return {
        type: primitiveMappings[def.innerType._def.typeName],
        nullable: true
      };
    }
    return {
      type: [
        primitiveMappings[def.innerType._def.typeName],
        "null"
      ]
    };
  }
  if (refs.target === "openApi3") {
    const base2 = parseDef(def.innerType._def, {
      ...refs,
      currentPath: [...refs.currentPath]
    });
    if (base2 && "$ref" in base2)
      return { allOf: [base2], nullable: true };
    return base2 && { ...base2, nullable: true };
  }
  const base = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "0"]
  });
  return base && { anyOf: [base, { type: "null" }] };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/number.js
function parseNumberDef(def, refs) {
  const res = {
    type: "number"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "int":
        res.type = "integer";
        addErrorMessage(res, "type", check.message, refs);
        break;
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/object.js
function decideAdditionalProperties(def, refs) {
  if (refs.removeAdditionalStrategy === "strict") {
    return def.catchall._def.typeName === "ZodNever" ? def.unknownKeys !== "strict" : _nullishCoalesce(parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }), () => ( true));
  } else {
    return def.catchall._def.typeName === "ZodNever" ? def.unknownKeys === "passthrough" : _nullishCoalesce(parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }), () => ( true));
  }
}
function parseObjectDef(def, refs) {
  const result = {
    type: "object",
    ...Object.entries(def.shape()).reduce((acc, [propName, propDef]) => {
      if (propDef === void 0 || propDef._def === void 0)
        return acc;
      const parsedDef = parseDef(propDef._def, {
        ...refs,
        currentPath: [...refs.currentPath, "properties", propName],
        propertyPath: [...refs.currentPath, "properties", propName]
      });
      if (parsedDef === void 0)
        return acc;
      return {
        properties: { ...acc.properties, [propName]: parsedDef },
        required: propDef.isOptional() ? acc.required : [...acc.required, propName]
      };
    }, { properties: {}, required: [] }),
    additionalProperties: decideAdditionalProperties(def, refs)
  };
  if (!result.required.length)
    delete result.required;
  return result;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/optional.js
var parseOptionalDef = (def, refs) => {
  if (refs.currentPath.toString() === _optionalChain([refs, 'access', _28 => _28.propertyPath, 'optionalAccess', _29 => _29.toString, 'call', _30 => _30()])) {
    return parseDef(def.innerType._def, refs);
  }
  const innerSchema = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "1"]
  });
  return innerSchema ? {
    anyOf: [
      {
        not: {}
      },
      innerSchema
    ]
  } : {};
};

// node_modules/zod-to-json-schema/dist/esm/parsers/pipeline.js
var parsePipelineDef = (def, refs) => {
  if (refs.pipeStrategy === "input") {
    return parseDef(def.in._def, refs);
  } else if (refs.pipeStrategy === "output") {
    return parseDef(def.out._def, refs);
  }
  const a = parseDef(def.in._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", "0"]
  });
  const b = parseDef(def.out._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", a ? "1" : "0"]
  });
  return {
    allOf: [a, b].filter((x) => x !== void 0)
  };
};

// node_modules/zod-to-json-schema/dist/esm/parsers/promise.js
function parsePromiseDef(def, refs) {
  return parseDef(def.type._def, refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/set.js
function parseSetDef(def, refs) {
  const items = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items"]
  });
  const schema = {
    type: "array",
    uniqueItems: true,
    items
  };
  if (def.minSize) {
    setResponseValueAndErrors(schema, "minItems", def.minSize.value, def.minSize.message, refs);
  }
  if (def.maxSize) {
    setResponseValueAndErrors(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
  }
  return schema;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js
function parseTupleDef(def, refs) {
  if (def.rest) {
    return {
      type: "array",
      minItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === void 0 ? acc : [...acc, x], []),
      additionalItems: parseDef(def.rest._def, {
        ...refs,
        currentPath: [...refs.currentPath, "additionalItems"]
      })
    };
  } else {
    return {
      type: "array",
      minItems: def.items.length,
      maxItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === void 0 ? acc : [...acc, x], [])
    };
  }
}

// node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js
function parseUndefinedDef() {
  return {
    not: {}
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js
function parseUnknownDef() {
  return {};
}

// node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js
var parseReadonlyDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};

// node_modules/zod-to-json-schema/dist/esm/parseDef.js
function parseDef(def, refs, forceResolution = false) {
  const seenItem = refs.seen.get(def);
  if (refs.override) {
    const overrideResult = _optionalChain([refs, 'access', _31 => _31.override, 'optionalCall', _32 => _32(def, refs, seenItem, forceResolution)]);
    if (overrideResult !== ignoreOverride) {
      return overrideResult;
    }
  }
  if (seenItem && !forceResolution) {
    const seenSchema = get$ref(seenItem, refs);
    if (seenSchema !== void 0) {
      return seenSchema;
    }
  }
  const newItem = { def, path: refs.currentPath, jsonSchema: void 0 };
  refs.seen.set(def, newItem);
  const jsonSchema = selectParser(def, def.typeName, refs);
  if (jsonSchema) {
    addMeta(def, refs, jsonSchema);
  }
  newItem.jsonSchema = jsonSchema;
  return jsonSchema;
}
var get$ref = (item, refs) => {
  switch (refs.$refStrategy) {
    case "root":
      return { $ref: item.path.join("/") };
    case "relative":
      return { $ref: getRelativePath(refs.currentPath, item.path) };
    case "none":
    case "seen": {
      if (item.path.length < refs.currentPath.length && item.path.every((value, index) => refs.currentPath[index] === value)) {
        console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
        return {};
      }
      return refs.$refStrategy === "seen" ? {} : void 0;
    }
  }
};
var getRelativePath = (pathA, pathB) => {
  let i = 0;
  for (; i < pathA.length && i < pathB.length; i++) {
    if (pathA[i] !== pathB[i])
      break;
  }
  return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
};
var selectParser = (def, typeName, refs) => {
  switch (typeName) {
    case _zod.ZodFirstPartyTypeKind.ZodString:
      return parseStringDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodNumber:
      return parseNumberDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodObject:
      return parseObjectDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodBigInt:
      return parseBigintDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodBoolean:
      return parseBooleanDef();
    case _zod.ZodFirstPartyTypeKind.ZodDate:
      return parseDateDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodUndefined:
      return parseUndefinedDef();
    case _zod.ZodFirstPartyTypeKind.ZodNull:
      return parseNullDef(refs);
    case _zod.ZodFirstPartyTypeKind.ZodArray:
      return parseArrayDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodUnion:
    case _zod.ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
      return parseUnionDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodIntersection:
      return parseIntersectionDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodTuple:
      return parseTupleDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodRecord:
      return parseRecordDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodLiteral:
      return parseLiteralDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodEnum:
      return parseEnumDef(def);
    case _zod.ZodFirstPartyTypeKind.ZodNativeEnum:
      return parseNativeEnumDef(def);
    case _zod.ZodFirstPartyTypeKind.ZodNullable:
      return parseNullableDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodOptional:
      return parseOptionalDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodMap:
      return parseMapDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodSet:
      return parseSetDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodLazy:
      return parseDef(def.getter()._def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodPromise:
      return parsePromiseDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodNaN:
    case _zod.ZodFirstPartyTypeKind.ZodNever:
      return parseNeverDef();
    case _zod.ZodFirstPartyTypeKind.ZodEffects:
      return parseEffectsDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodAny:
      return parseAnyDef();
    case _zod.ZodFirstPartyTypeKind.ZodUnknown:
      return parseUnknownDef();
    case _zod.ZodFirstPartyTypeKind.ZodDefault:
      return parseDefaultDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodBranded:
      return parseBrandedDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodReadonly:
      return parseReadonlyDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodCatch:
      return parseCatchDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodPipeline:
      return parsePipelineDef(def, refs);
    case _zod.ZodFirstPartyTypeKind.ZodFunction:
    case _zod.ZodFirstPartyTypeKind.ZodVoid:
    case _zod.ZodFirstPartyTypeKind.ZodSymbol:
      return void 0;
    default:
      return /* @__PURE__ */ ((_) => void 0)(typeName);
  }
};
var addMeta = (def, refs, jsonSchema) => {
  if (def.description) {
    jsonSchema.description = def.description;
    if (refs.markdownDescription) {
      jsonSchema.markdownDescription = def.description;
    }
  }
  return jsonSchema;
};

// node_modules/zod-to-json-schema/dist/esm/zodToJsonSchema.js
var zodToJsonSchema = (schema, options) => {
  const refs = getRefs(options);
  const definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name2, schema2]) => ({
    ...acc,
    [name2]: _nullishCoalesce(parseDef(schema2._def, {
      ...refs,
      currentPath: [...refs.basePath, refs.definitionPath, name2]
    }, true), () => ( {}))
  }), {}) : void 0;
  const name = typeof options === "string" ? options : _optionalChain([options, 'optionalAccess', _33 => _33.nameStrategy]) === "title" ? void 0 : _optionalChain([options, 'optionalAccess', _34 => _34.name]);
  const main = _nullishCoalesce(parseDef(schema._def, name === void 0 ? refs : {
    ...refs,
    currentPath: [...refs.basePath, refs.definitionPath, name]
  }, false), () => ( {}));
  const title = typeof options === "object" && options.name !== void 0 && options.nameStrategy === "title" ? options.name : void 0;
  if (title !== void 0) {
    main.title = title;
  }
  const combined = name === void 0 ? definitions ? {
    ...main,
    [refs.definitionPath]: definitions
  } : main : {
    $ref: [
      ...refs.$refStrategy === "relative" ? [] : refs.basePath,
      refs.definitionPath,
      name
    ].join("/"),
    [refs.definitionPath]: {
      ...definitions,
      [name]: main
    }
  };
  if (refs.target === "jsonSchema7") {
    combined.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (refs.target === "jsonSchema2019-09") {
    combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
  }
  return combined;
};

// src/utils/checkType.ts
var checkType_default = (data, type) => {
  const result = type.safeParse(data);
  if (result.error) {
    console.error(
      "Invalid data type, please report to https://github.com/zS1L3NT/ts-npm-ytmusic-api/issues/new/choose",
      JSON.stringify(
        {
          data,
          schema: zodToJsonSchema(type, "schema"),
          error: result.error
        },
        null,
        2
      )
    );
  }
  return data;
};

// src/utils/traverse.ts
var traverse = (data, ...keys) => {
  const again = (data2, key, deadEnd = false) => {
    const res = [];
    if (data2 instanceof Object && key in data2) {
      res.push(data2[key]);
      if (deadEnd) return res.length === 1 ? res[0] : res;
    }
    if (data2 instanceof Array) {
      res.push(...data2.map((v) => again(v, key)).flat());
    } else if (data2 instanceof Object) {
      res.push(
        ...Object.keys(data2).map((k) => again(data2[k], key)).flat()
      );
    }
    return res.length === 1 ? res[0] : res;
  };
  let value = data;
  const lastKey = keys.at(-1);
  for (const key of keys) {
    value = again(value, key, lastKey === key);
  }
  return value;
};
var traverseList = (data, ...keys) => {
  return [traverse(data, ...keys)].flat();
};
var traverseString = (data, ...keys) => {
  return traverseList(data, ...keys).at(0) || "";
};

// src/utils/filters.ts
var isTitle = (data) => {
  return traverseString(data, "musicVideoType").startsWith("MUSIC_VIDEO_TYPE_");
};
var isArtist = (data) => {
  return ["MUSIC_PAGE_TYPE_USER_CHANNEL", "MUSIC_PAGE_TYPE_ARTIST"].includes(
    traverseString(data, "pageType")
  );
};
var isAlbum = (data) => {
  return traverseString(data, "pageType") === "MUSIC_PAGE_TYPE_ALBUM";
};
var isDuration = (data) => {
  return traverseString(data, "text").match(/(\d{1,2}:)?\d{1,2}:\d{1,2}/);
};

// src/parsers/PlaylistParser.ts
var PlaylistParser = class {
  static parse(data, playlistId) {
    const artist = traverse(data, "tabs", "straplineTextOne");
    return checkType_default(
      {
        type: "PLAYLIST",
        playlistId,
        name: traverseString(data, "tabs", "title", "text"),
        artist: {
          name: traverseString(artist, "text"),
          artistId: traverseString(artist, "browseId") || null
        },
        videoCount: +traverseList(data, "tabs", "secondSubtitle", "text").at(2).split(" ").at(0).replaceAll(",", ""),
        thumbnails: traverseList(data, "tabs", "thumbnails")
      },
      PlaylistFull
    );
  }
  static parseSearchResult(item) {
    const columns = traverseList(item, "flexColumns", "runs").flat();
    const title = columns[0];
    const artist = columns.find(isArtist) || columns[3];
    return checkType_default(
      {
        type: "PLAYLIST",
        playlistId: traverseString(item, "overlay", "playlistId"),
        name: traverseString(title, "text"),
        artist: {
          name: traverseString(artist, "text"),
          artistId: traverseString(artist, "browseId") || null
        },
        thumbnails: traverseList(item, "thumbnails")
      },
      PlaylistDetailed
    );
  }
  static parseArtistFeaturedOn(item, artistBasic) {
    return checkType_default(
      {
        type: "PLAYLIST",
        playlistId: traverseString(item, "navigationEndpoint", "browseId"),
        name: traverseString(item, "runs", "text"),
        artist: artistBasic,
        thumbnails: traverseList(item, "thumbnails")
      },
      PlaylistDetailed
    );
  }
  static parseHomeSection(item) {
    const artist = traverse(item, "subtitle", "runs");
    return checkType_default(
      {
        type: "PLAYLIST",
        playlistId: traverseString(item, "navigationEndpoint", "playlistId"),
        name: traverseString(item, "runs", "text"),
        artist: {
          name: traverseString(artist, "text"),
          artistId: traverseString(artist, "browseId") || null
        },
        thumbnails: traverseList(item, "thumbnails")
      },
      PlaylistDetailed
    );
  }
};

// src/parsers/Parser.ts
var Parser = class {
  static parseDuration(time) {
    if (!time) return null;
    const [seconds, minutes, hours] = time.split(":").reverse().map((n) => +n);
    return (seconds || 0) + (minutes || 0) * 60 + (hours || 0) * 60 * 60;
  }
  static parseNumber(string) {
    if (string.at(-1).match(/^[A-Z]+$/)) {
      const number = +string.slice(0, -1);
      const multiplier = string.at(-1);
      return {
        K: number * 1e3,
        M: number * 1e3 * 1e3,
        B: number * 1e3 * 1e3 * 1e3,
        T: number * 1e3 * 1e3 * 1e3 * 1e3
      }[multiplier] || NaN;
    } else {
      return +string;
    }
  }
  static parseHomeSection(data) {
    const pageType = traverseString(data, "contents", "title", "browseEndpoint", "pageType");
    const playlistId = traverseString(
      data,
      "navigationEndpoint",
      "watchPlaylistEndpoint",
      "playlistId"
    );
    return checkType_default(
      {
        title: traverseString(data, "header", "title", "text"),
        contents: traverseList(data, "contents").map((item) => {
          switch (pageType) {
            case "MUSIC_PAGE_TYPE_ALBUM" /* MUSIC_PAGE_TYPE_ALBUM */:
              return AlbumParser.parseHomeSection(item);
            case "MUSIC_PAGE_TYPE_PLAYLIST" /* MUSIC_PAGE_TYPE_PLAYLIST */:
              return PlaylistParser.parseHomeSection(item);
            case "":
              if (playlistId) {
                return PlaylistParser.parseHomeSection(item);
              } else {
                return SongParser.parseHomeSection(item);
              }
            default:
              return null;
          }
        })
      },
      HomeSection
    );
  }
};

// src/parsers/SongParser.ts
var SongParser = class _SongParser {
  static parse(data) {
    return checkType_default(
      {
        type: "SONG",
        videoId: traverseString(data, "videoDetails", "videoId"),
        name: traverseString(data, "videoDetails", "title"),
        artist: {
          name: traverseString(data, "author"),
          artistId: traverseString(data, "videoDetails", "channelId")
        },
        duration: +traverseString(data, "videoDetails", "lengthSeconds"),
        thumbnails: traverseList(data, "videoDetails", "thumbnails"),
        formats: traverseList(data, "streamingData", "formats"),
        adaptiveFormats: traverseList(data, "streamingData", "adaptiveFormats")
      },
      SongFull
    );
  }
  static parseSearchResult(item) {
    const columns = traverseList(item, "flexColumns", "runs");
    const title = columns[0];
    const artist = columns.find(isArtist) || columns[3];
    const album = _nullishCoalesce(columns.find(isAlbum), () => ( null));
    const duration = columns.find(isDuration);
    return checkType_default(
      {
        type: "SONG",
        videoId: traverseString(item, "playlistItemData", "videoId"),
        name: traverseString(title, "text"),
        artist: {
          name: traverseString(artist, "text"),
          artistId: traverseString(artist, "browseId") || null
        },
        album: album ? {
          name: traverseString(album, "text"),
          albumId: traverseString(album, "browseId")
        } : null,
        duration: Parser.parseDuration(_optionalChain([duration, 'optionalAccess', _35 => _35.text])),
        thumbnails: traverseList(item, "thumbnails")
      },
      SongDetailed
    );
  }
  static parseArtistSong(item, artistBasic) {
    const columns = traverseList(item, "flexColumns", "runs").flat();
    const title = columns.find(isTitle);
    const album = columns.find(isAlbum);
    const duration = columns.find(isDuration);
    return checkType_default(
      {
        type: "SONG",
        videoId: traverseString(item, "playlistItemData", "videoId"),
        name: traverseString(title, "text"),
        artist: artistBasic,
        album: album ? {
          name: traverseString(album, "text"),
          albumId: traverseString(album, "browseId")
        } : null,
        duration: Parser.parseDuration(_optionalChain([duration, 'optionalAccess', _36 => _36.text])),
        thumbnails: traverseList(item, "thumbnails")
      },
      SongDetailed
    );
  }
  static parseArtistTopSong(item, artistBasic) {
    const columns = traverseList(item, "flexColumns", "runs").flat();
    const title = columns.find(isTitle);
    const album = columns.find(isAlbum);
    return checkType_default(
      {
        type: "SONG",
        videoId: traverseString(item, "playlistItemData", "videoId"),
        name: traverseString(title, "text"),
        artist: artistBasic,
        album: {
          name: traverseString(album, "text"),
          albumId: traverseString(album, "browseId")
        },
        duration: null,
        thumbnails: traverseList(item, "thumbnails")
      },
      SongDetailed
    );
  }
  static parseAlbumSong(item, artistBasic, albumBasic, thumbnails) {
    const title = traverseList(item, "flexColumns", "runs").find(isTitle);
    const duration = traverseList(item, "fixedColumns", "runs").find(isDuration);
    return checkType_default(
      {
        type: "SONG",
        videoId: traverseString(item, "playlistItemData", "videoId"),
        name: traverseString(title, "text"),
        artist: artistBasic,
        album: albumBasic,
        duration: Parser.parseDuration(_optionalChain([duration, 'optionalAccess', _37 => _37.text])),
        thumbnails
      },
      SongDetailed
    );
  }
  static parseHomeSection(item) {
    return _SongParser.parseSearchResult(item);
  }
};

// src/parsers/AlbumParser.ts
var AlbumParser = class _AlbumParser {
  static parse(data, albumId) {
    const albumBasic = {
      albumId,
      name: traverseString(data, "tabs", "title", "text")
    };
    const artistData = traverse(data, "tabs", "straplineTextOne", "runs");
    const artistBasic = {
      artistId: traverseString(artistData, "browseId") || null,
      name: traverseString(artistData, "text")
    };
    const thumbnails = traverseList(data, "background", "thumbnails");
    return checkType_default(
      {
        type: "ALBUM",
        ...albumBasic,
        playlistId: traverseString(data, "musicPlayButtonRenderer", "playlistId"),
        artist: artistBasic,
        year: _AlbumParser.processYear(
          traverseList(data, "tabs", "subtitle", "text").at(-1)
        ),
        thumbnails,
        songs: traverseList(data, "musicResponsiveListItemRenderer").map(
          (item) => SongParser.parseAlbumSong(item, artistBasic, albumBasic, thumbnails)
        )
      },
      AlbumFull
    );
  }
  static parseSearchResult(item) {
    const columns = traverseList(item, "flexColumns", "runs").flat();
    const title = columns[0];
    const artist = columns.find(isArtist) || columns[3];
    const playlistId = traverseString(item, "overlay", "playlistId") || traverseString(item, "thumbnailOverlay", "playlistId");
    return checkType_default(
      {
        type: "ALBUM",
        albumId: traverseList(item, "browseId").at(-1),
        playlistId,
        artist: {
          name: traverseString(artist, "text"),
          artistId: traverseString(artist, "browseId") || null
        },
        year: _AlbumParser.processYear(_optionalChain([columns, 'access', _38 => _38.at, 'call', _39 => _39(-1), 'optionalAccess', _40 => _40.text])),
        name: traverseString(title, "text"),
        thumbnails: traverseList(item, "thumbnails")
      },
      AlbumDetailed
    );
  }
  static parseArtistAlbum(item, artistBasic) {
    return checkType_default(
      {
        type: "ALBUM",
        albumId: traverseList(item, "browseId").at(-1),
        playlistId: traverseString(item, "thumbnailOverlay", "playlistId"),
        name: traverseString(item, "title", "text"),
        artist: artistBasic,
        year: _AlbumParser.processYear(traverseList(item, "subtitle", "text").at(-1)),
        thumbnails: traverseList(item, "thumbnails")
      },
      AlbumDetailed
    );
  }
  static parseArtistTopAlbum(item, artistBasic) {
    return checkType_default(
      {
        type: "ALBUM",
        albumId: traverseList(item, "browseId").at(-1),
        playlistId: traverseString(item, "musicPlayButtonRenderer", "playlistId"),
        name: traverseString(item, "title", "text"),
        artist: artistBasic,
        year: _AlbumParser.processYear(traverseList(item, "subtitle", "text").at(-1)),
        thumbnails: traverseList(item, "thumbnails")
      },
      AlbumDetailed
    );
  }
  static parseHomeSection(item) {
    const artist = traverse(item, "subtitle", "runs").at(-1);
    return checkType_default(
      {
        type: "ALBUM",
        albumId: traverseString(item, "title", "browseId"),
        playlistId: traverseString(item, "thumbnailOverlay", "playlistId"),
        name: traverseString(item, "title", "text"),
        artist: {
          name: traverseString(artist, "text"),
          artistId: traverseString(artist, "browseId") || null
        },
        year: null,
        thumbnails: traverseList(item, "thumbnails")
      },
      AlbumDetailed
    );
  }
  static processYear(year) {
    return year && year.match(/^\d{4}$/) ? +year : null;
  }
};

// src/parsers/VideoParser.ts
var VideoParser = class {
  static parse(data) {
    return {
      type: "VIDEO",
      videoId: traverseString(data, "videoDetails", "videoId"),
      name: traverseString(data, "videoDetails", "title"),
      artist: {
        artistId: traverseString(data, "videoDetails", "channelId"),
        name: traverseString(data, "author")
      },
      duration: +traverseString(data, "videoDetails", "lengthSeconds"),
      thumbnails: traverseList(data, "videoDetails", "thumbnails"),
      unlisted: traverse(data, "unlisted"),
      familySafe: traverse(data, "familySafe"),
      paid: traverse(data, "paid"),
      tags: traverseList(data, "tags")
    };
  }
  static parseSearchResult(item) {
    const columns = traverseList(item, "flexColumns", "runs").flat();
    const title = columns.find(isTitle);
    const artist = columns.find(isArtist) || columns[1];
    const duration = columns.find(isDuration);
    return {
      type: "VIDEO",
      videoId: traverseString(item, "playNavigationEndpoint", "videoId"),
      name: traverseString(title, "text"),
      artist: {
        artistId: traverseString(artist, "browseId") || null,
        name: traverseString(artist, "text")
      },
      duration: Parser.parseDuration(_optionalChain([duration, 'optionalAccess', _41 => _41.text])),
      thumbnails: traverseList(item, "thumbnails")
    };
  }
  static parseArtistTopVideo(item, artistBasic) {
    return {
      type: "VIDEO",
      videoId: traverseString(item, "videoId"),
      name: traverseString(item, "runs", "text"),
      artist: artistBasic,
      duration: null,
      thumbnails: traverseList(item, "thumbnails")
    };
  }
  static parsePlaylistVideo(item) {
    const columns = traverseList(item, "flexColumns", "runs").flat();
    const title = columns.find(isTitle) || columns[0];
    const artist = columns.find(isArtist) || columns[1];
    const duration = columns.find(isDuration);
    return checkType_default(
      {
        type: "VIDEO",
        videoId: traverseString(item, "playNavigationEndpoint", "videoId") || traverseList(item, "thumbnails")[0].url.match(
          /https:\/\/i\.ytimg\.com\/vi\/(.+)\//
        )[1],
        name: traverseString(title, "text"),
        artist: {
          name: traverseString(artist, "text"),
          artistId: traverseString(artist, "browseId") || null
        },
        duration: Parser.parseDuration(_optionalChain([duration, 'optionalAccess', _42 => _42.text])),
        thumbnails: traverseList(item, "thumbnails")
      },
      VideoDetailed
    );
  }
};

// src/parsers/ArtistParser.ts
var ArtistParser = class {
  static parse(data, artistId) {
    const artistBasic = {
      artistId,
      name: traverseString(data, "header", "title", "text")
    };
    return checkType_default(
      {
        type: "ARTIST",
        ...artistBasic,
        thumbnails: traverseList(data, "header", "thumbnails"),
        topSongs: traverseList(data, "musicShelfRenderer", "contents").map(
          (item) => SongParser.parseArtistTopSong(item, artistBasic)
        ),
        topAlbums: _nullishCoalesce(_optionalChain([traverseList, 'call', _43 => _43(data, "musicCarouselShelfRenderer"), 'optionalAccess', _44 => _44.at, 'call', _45 => _45(0), 'optionalAccess', _46 => _46.contents, 'access', _47 => _47.map, 'call', _48 => _48(
          (item) => AlbumParser.parseArtistTopAlbum(item, artistBasic)
        )]), () => ( [])),
        topSingles: _nullishCoalesce(_optionalChain([traverseList, 'call', _49 => _49(data, "musicCarouselShelfRenderer"), 'optionalAccess', _50 => _50.at, 'call', _51 => _51(1), 'optionalAccess', _52 => _52.contents, 'access', _53 => _53.map, 'call', _54 => _54(
          (item) => AlbumParser.parseArtistTopAlbum(item, artistBasic)
        )]), () => ( [])),
        topVideos: _nullishCoalesce(_optionalChain([traverseList, 'call', _55 => _55(data, "musicCarouselShelfRenderer"), 'optionalAccess', _56 => _56.at, 'call', _57 => _57(2), 'optionalAccess', _58 => _58.contents, 'access', _59 => _59.map, 'call', _60 => _60(
          (item) => VideoParser.parseArtistTopVideo(item, artistBasic)
        )]), () => ( [])),
        featuredOn: _nullishCoalesce(_optionalChain([traverseList, 'call', _61 => _61(data, "musicCarouselShelfRenderer"), 'optionalAccess', _62 => _62.at, 'call', _63 => _63(3), 'optionalAccess', _64 => _64.contents, 'access', _65 => _65.map, 'call', _66 => _66(
          (item) => PlaylistParser.parseArtistFeaturedOn(item, artistBasic)
        )]), () => ( [])),
        similarArtists: _nullishCoalesce(_optionalChain([traverseList, 'call', _67 => _67(data, "musicCarouselShelfRenderer"), 'optionalAccess', _68 => _68.at, 'call', _69 => _69(4), 'optionalAccess', _70 => _70.contents, 'access', _71 => _71.map, 'call', _72 => _72((item) => this.parseSimilarArtists(item))]), () => ( []))
      },
      ArtistFull
    );
  }
  static parseSearchResult(item) {
    const columns = traverseList(item, "flexColumns", "runs").flat();
    const title = columns[0];
    return checkType_default(
      {
        type: "ARTIST",
        artistId: traverseString(item, "browseId"),
        name: traverseString(title, "text"),
        thumbnails: traverseList(item, "thumbnails")
      },
      ArtistDetailed
    );
  }
  static parseSimilarArtists(item) {
    return checkType_default(
      {
        type: "ARTIST",
        artistId: traverseString(item, "browseId"),
        name: traverseString(item, "runs", "text"),
        thumbnails: traverseList(item, "thumbnails")
      },
      ArtistDetailed
    );
  }
};

// src/parsers/SearchParser.ts
var SearchParser = class {
  static parse(item) {
    const flexColumns = traverseList(item, "flexColumns");
    const type = traverseList(flexColumns[1], "runs", "text").at(0);
    const parsers = {
      Song: SongParser.parseSearchResult,
      Video: VideoParser.parseSearchResult,
      Artist: ArtistParser.parseSearchResult,
      EP: AlbumParser.parseSearchResult,
      Single: AlbumParser.parseSearchResult,
      Album: AlbumParser.parseSearchResult,
      Playlist: PlaylistParser.parseSearchResult
    };
    if (parsers[type]) {
      return parsers[type](item);
    } else {
      return null;
    }
  }
};

// src/YTMusic.ts
_axios2.default.defaults.headers.common["Accept-Encoding"] = "gzip";
var YTMusic = class {
  
  
  
  /**
   * Creates an instance of YTMusic
   * Make sure to call initialize()
   */
  constructor() {
    this.cookiejar = new (0, _toughcookie.CookieJar)();
    this.config = {};
    this.client = _axios2.default.create({
      baseURL: "https://music.youtube.com/",
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.5"
      },
      withCredentials: true
    });
    this.client.interceptors.request.use((req) => {
      if (req.baseURL) {
        const cookieString = this.cookiejar.getCookieStringSync(req.baseURL);
        if (cookieString) {
          req.headers["cookie"] = cookieString;
        }
      }
      return req;
    });
    this.client.interceptors.response.use((res) => {
      if (res.headers && res.config.baseURL) {
        const cookieStrings = res.headers["set-cookie"] || [];
        for (const cookieString of cookieStrings) {
          const cookie = _toughcookie.Cookie.parse(cookieString);
          if (cookie) {
            this.cookiejar.setCookieSync(cookie, res.config.baseURL);
          }
        }
      }
      return res;
    });
  }
  /**
   * Initializes the API
   */
  async initialize(options) {
    const { cookies, GL, HL, accessToken } = _nullishCoalesce(options, () => ( {}));
    if (cookies) {
      for (const cookieString of cookies.split("; ")) {
        const cookie = _toughcookie.Cookie.parse(`${cookieString}`);
        if (!cookie) return;
        this.cookiejar.setCookieSync(cookie, "https://www.youtube.com/");
      }
    }
    const html = (await this.client.get("/")).data;
    const setConfigs = html.match(/ytcfg\.set\(.*\)/) || [];
    const configs = setConfigs.map((c) => c.slice(10, -1)).map((s) => {
      try {
        return JSON.parse(s);
      } catch (e2) {
        return null;
      }
    }).filter((j) => !!j);
    for (const config of configs) {
      this.config = {
        ...this.config,
        ...config
      };
    }
    if (!this.config) {
      this.config = {};
    }
    if (GL) this.config.GL = GL;
    if (HL) this.config.HL = HL;
    if (accessToken) this.config.accessToken = accessToken;
    return this;
  }
  /**
   * Constructs a basic YouTube Music API request with all essential headers
   * and body parameters needed to make the API work
   *
   * @param endpoint Endpoint for the request
   * @param body Body
   * @param query Search params
   * @returns Raw response from YouTube Music API which needs to be parsed
   */
  async constructRequest(endpoint, body = {}, query = {}) {
    if (!this.config) {
      throw new Error("API not initialized. Make sure to call the initialize() method first");
    }
    const headers = {
      ...this.client.defaults.headers,
      "x-origin": this.client.defaults.baseURL,
      "X-Goog-Visitor-Id": this.config.VISITOR_DATA || "",
      "X-YouTube-Client-Name": this.config.INNERTUBE_CONTEXT_CLIENT_NAME,
      "X-YouTube-Client-Version": this.config.INNERTUBE_CLIENT_VERSION,
      "X-YouTube-Device": this.config.DEVICE,
      "X-YouTube-Page-CL": this.config.PAGE_CL,
      "X-YouTube-Page-Label": this.config.PAGE_BUILD_LABEL,
      "X-YouTube-Utc-Offset": String(-(/* @__PURE__ */ new Date()).getTimezoneOffset()),
      "X-YouTube-Time-Zone": new Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    if (this.config.accessToken) {
      headers["Authorization"] = `Bearer ${this.config.accessToken}`;
    }
    const searchParams = new URLSearchParams({
      ...query,
      alt: "json",
      key: this.config.INNERTUBE_API_KEY
    });
    const res = await this.client.post(
      `youtubei/${this.config.INNERTUBE_API_VERSION}/${endpoint}?${searchParams.toString()}`,
      {
        context: {
          capabilities: {},
          client: {
            clientName: this.config.INNERTUBE_CLIENT_NAME,
            clientVersion: this.config.INNERTUBE_CLIENT_VERSION,
            experimentIds: [],
            experimentsToken: "",
            gl: this.config.GL,
            hl: this.config.HL,
            locationInfo: {
              locationPermissionAuthorizationStatus: "LOCATION_PERMISSION_AUTHORIZATION_STATUS_UNSUPPORTED"
            },
            musicAppInfo: {
              musicActivityMasterSwitch: "MUSIC_ACTIVITY_MASTER_SWITCH_INDETERMINATE",
              musicLocationMasterSwitch: "MUSIC_LOCATION_MASTER_SWITCH_INDETERMINATE",
              pwaInstallabilityStatus: "PWA_INSTALLABILITY_STATUS_UNKNOWN"
            },
            utcOffsetMinutes: -(/* @__PURE__ */ new Date()).getTimezoneOffset()
          },
          request: {
            internalExperimentFlags: [
              {
                key: "force_music_enable_outertube_tastebuilder_browse",
                value: "true"
              },
              {
                key: "force_music_enable_outertube_playlist_detail_browse",
                value: "true"
              },
              {
                key: "force_music_enable_outertube_search_suggestions",
                value: "true"
              }
            ],
            sessionIndex: {}
          },
          user: {
            enableSafetyMode: false
          }
        },
        ...body
      },
      {
        responseType: "json",
        headers
      }
    );
    return "responseContext" in res.data ? res.data : res;
  }
  /**
   * Get a list of search suggestiong based on the query
   *
   * @param query Query string
   * @returns Search suggestions
   */
  async getSearchSuggestions(query) {
    return traverseList(
      await this.constructRequest("music/get_search_suggestions", {
        input: query
      }),
      "query"
    );
  }
  /**
   * Searches YouTube Music API for results
   *
   * @param query Query string
   */
  async search(query) {
    const searchData = await this.constructRequest("search", {
      query,
      params: null
    });
    return traverseList(searchData, "musicResponsiveListItemRenderer").map(SearchParser.parse).filter(Boolean);
  }
  /**
   * Searches YouTube Music API for songs
   *
   * @param query Query string
   */
  async searchSongs(query) {
    const searchData = await this.constructRequest("search", {
      query,
      params: "Eg-KAQwIARAAGAAgACgAMABqChAEEAMQCRAFEAo%3D"
    });
    return traverseList(searchData, "musicResponsiveListItemRenderer").map(
      SongParser.parseSearchResult
    );
  }
  /**
   * Searches YouTube Music API for videos
   *
   * @param query Query string
   */
  async searchVideos(query) {
    const searchData = await this.constructRequest("search", {
      query,
      params: "Eg-KAQwIABABGAAgACgAMABqChAEEAMQCRAFEAo%3D"
    });
    return traverseList(searchData, "musicResponsiveListItemRenderer").map(
      VideoParser.parseSearchResult
    );
  }
  /**
   * Searches YouTube Music API for artists
   *
   * @param query Query string
   */
  async searchArtists(query) {
    const searchData = await this.constructRequest("search", {
      query,
      params: "Eg-KAQwIABAAGAAgASgAMABqChAEEAMQCRAFEAo%3D"
    });
    return traverseList(searchData, "musicResponsiveListItemRenderer").map(
      ArtistParser.parseSearchResult
    );
  }
  /**
   * Searches YouTube Music API for albums
   *
   * @param query Query string
   */
  async searchAlbums(query) {
    const searchData = await this.constructRequest("search", {
      query,
      params: "Eg-KAQwIABAAGAEgACgAMABqChAEEAMQCRAFEAo%3D"
    });
    return traverseList(searchData, "musicResponsiveListItemRenderer").map(
      AlbumParser.parseSearchResult
    );
  }
  /**
   * Searches YouTube Music API for playlists
   *
   * @param query Query string
   */
  async searchPlaylists(query) {
    const searchData = await this.constructRequest("search", {
      query,
      params: "Eg-KAQwIABAAGAAgACgBMABqChAEEAMQCRAFEAo%3D"
    });
    return traverseList(searchData, "musicResponsiveListItemRenderer").map(
      PlaylistParser.parseSearchResult
    );
  }
  /**
   * Get all possible information of a Song
   *
   * @param videoId Video ID
   * @returns Song Data
   */
  async getSong(videoId) {
    if (!videoId.match(/^[a-zA-Z0-9-_]{11}$/)) throw new Error("Invalid videoId");
    const data = await this.constructRequest("player", { videoId });
    const song = SongParser.parse(data);
    if (song.videoId !== videoId) throw new Error("Invalid videoId");
    return song;
  }
  /**
   * Get all possible information of a Video
   *
   * @param videoId Video ID
   * @returns Video Data
   */
  async getVideo(videoId) {
    if (!videoId.match(/^[a-zA-Z0-9-_]{11}$/)) throw new Error("Invalid videoId");
    const data = await this.constructRequest("player", { videoId });
    const video = VideoParser.parse(data);
    if (video.videoId !== videoId) throw new Error("Invalid videoId");
    return video;
  }
  /**
   * Get lyrics of a specific Song
   *
   * @param videoId Video ID
   * @returns Lyrics
   */
  async getLyrics(videoId) {
    if (!videoId.match(/^[a-zA-Z0-9-_]{11}$/)) throw new Error("Invalid videoId");
    const data = await this.constructRequest("next", { videoId });
    const browseId = traverse(traverseList(data, "tabs", "tabRenderer")[1], "browseId");
    const lyricsData = await this.constructRequest("browse", { browseId });
    const lyrics = traverseString(lyricsData, "description", "runs", "text");
    return lyrics ? lyrics.replaceAll("\r", "").split("\n").filter((v) => !!v) : null;
  }
  /**
   * Get all possible information of an Artist
   *
   * @param artistId Artist ID
   * @returns Artist Data
   */
  async getArtist(artistId) {
    const data = await this.constructRequest("browse", {
      browseId: artistId
    });
    return ArtistParser.parse(data, artistId);
  }
  /**
   * Get all of Artist's Songs
   *
   * @param artistId Artist ID
   * @returns Artist's Songs
   */
  async getArtistSongs(artistId) {
    const artistData = await this.constructRequest("browse", {
      browseId: artistId
    });
    const browseToken = traverse(artistData, "musicShelfRenderer", "title", "browseId");
    if (browseToken instanceof Array) return [];
    const songsData = await this.constructRequest("browse", {
      browseId: browseToken
    });
    const continueToken = traverse(songsData, "continuation");
    const moreSongsData = await this.constructRequest(
      "browse",
      {},
      { continuation: continueToken }
    );
    return [
      ...traverseList(songsData, "musicResponsiveListItemRenderer"),
      ...traverseList(moreSongsData, "musicResponsiveListItemRenderer")
    ].map(
      (s) => SongParser.parseArtistSong(s, {
        artistId,
        name: traverseString(artistData, "header", "title", "text")
      })
    );
  }
  /**
   * Get all of Artist's Albums
   *
   * @param artistId Artist ID
   * @returns Artist's Albums
   */
  async getArtistAlbums(artistId) {
    const artistData = await this.constructRequest("browse", {
      browseId: artistId
    });
    const artistAlbumsData = traverseList(artistData, "musicCarouselShelfRenderer")[0];
    const browseBody = traverse(artistAlbumsData, "moreContentButton", "browseEndpoint");
    const albumsData = await this.constructRequest("browse", browseBody);
    return traverseList(albumsData, "musicTwoRowItemRenderer").map(
      (item) => AlbumParser.parseArtistAlbum(item, {
        artistId,
        name: traverseString(albumsData, "header", "runs", "text")
      })
    );
  }
  /**
   * Get all possible information of an Album
   *
   * @param albumId Album ID
   * @returns Album Data
   */
  async getAlbum(albumId) {
    const data = await this.constructRequest("browse", {
      browseId: albumId
    });
    return AlbumParser.parse(data, albumId);
  }
  /**
   * Get all possible information of a Playlist except the tracks
   *
   * @param playlistId Playlist ID
   * @returns Playlist Data
   */
  async getPlaylist(playlistId) {
    if (playlistId.startsWith("PL")) playlistId = "VL" + playlistId;
    const data = await this.constructRequest("browse", {
      browseId: playlistId
    });
    return PlaylistParser.parse(data, playlistId);
  }
  /**
   * Get all videos in a Playlist
   *
   * @param playlistId Playlist ID
   * @returns Playlist's Videos
   */
  async getPlaylistVideos(playlistId) {
    if (playlistId.startsWith("PL")) playlistId = "VL" + playlistId;
    const playlistData = await this.constructRequest("browse", {
      browseId: playlistId
    });
    const songs = traverseList(
      playlistData,
      "musicPlaylistShelfRenderer",
      "musicResponsiveListItemRenderer"
    );
    let continuation = traverse(playlistData, "continuation");
    while (!(continuation instanceof Array)) {
      const songsData = await this.constructRequest("browse", {}, { continuation });
      songs.push(...traverseList(songsData, "musicResponsiveListItemRenderer"));
      continuation = traverse(songsData, "continuation");
    }
    return songs.map(VideoParser.parsePlaylistVideo);
  }
  /**
   * Get sections for the home page.
   *
   * @returns Mixed HomeSection
   */
  async getHomeSections() {
    const data = await this.constructRequest("browse", {
      browseId: FE_MUSIC_HOME
    });
    const sections = traverseList("sectionListRenderer", "contents");
    let continuation = traverseString(data, "continuation");
    while (continuation) {
      const data2 = await this.constructRequest("browse", {}, { continuation });
      sections.push(...traverseList(data2, "sectionListContinuation", "contents"));
      continuation = traverseString(data2, "continuation");
    }
    return sections.map(Parser.parseHomeSection);
  }
};

// src/index.ts
var src_default = YTMusic;


exports.default = src_default;

module.exports = exports.default;
//# sourceMappingURL=index.js.map