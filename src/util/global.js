/*eslint no-useless-escape: "off"*/

import React from "react";
import moment from "moment";
import "moment-timezone";

export function dateFormatter(cell) {
  if (!cell) {
    return "";
  }
  return `${moment(cell).format("Do MMM YYYY")}`;
}

export function dateUTCFormatter(cell) {
  if (!cell) {
    return "";
  }
  return `${moment(cell).utc().format("Do MMM YYYY")}`;
}

export function dateTimeFormatter(cell) {
  if (!cell) {
    return "";
  }

  return `${moment(cell).format("Do MMM YYYY h:mm a")}`;
}

export function dateTime24Formatter(cell) {
  if (!cell) {
    return "";
  }

  return `${moment(cell).format("Do MMM YYYY HH:mm")}`;
}

export function timeFormatter(cell) {
  if (!cell) {
    return "";
  }

  return `${moment(cell).format("h:mm a")}`;
}

export function dateViewFormatter(cell) {
  if (!cell) {
    return "";
  }
  return `${moment(cell).format("DD-MMM-YYYY")}`;
}

export function dateNowFormatter(cell) {
  const today = dateComparisonFormatter(new Date());
  const date = dateComparisonFormatter(cell);

  const isBefore = moment(date).isBefore(today);
  const isToday = moment(date).isSame(today);

  return isBefore || isToday;
}

export function isEarliestBeforeLatest(early, latest) {
  if (!early || !latest) return false;

  const earlyDate = dateComparisonFormatter(early);
  const latestDate = dateComparisonFormatter(latest);

  const isBefore = moment(latestDate).isBefore(earlyDate);
  // const isSame = moment(latestDate).isSame(earlyDate);

  return isBefore;
}

export function isTodayFormat(cell) {
  const today = dateComparisonFormatter(new Date());
  const date = dateComparisonFormatter(cell);

  const isToday = moment(date).isSame(today);

  return isToday;
}

export function isYesterdayFormat(cell) {
  const yesterday = dateComparisonFormatter(
    moment(new Date()).subtract(1, "days")
  );
  const date = dateComparisonFormatter(cell);

  const isYesterday = moment(date).isSame(yesterday);

  return isYesterday;
}

export function isBeforeFormat(cell) {
  const today = dateComparisonFormatter(new Date());
  const date = dateComparisonFormatter(cell);

  const isBefore = moment(date).isBefore(today);

  return isBefore;
}

export function changeDateToUTC(date) {
  return moment(date).utc().format();
}

export function changeDateToTimezone(date, timezone = "Europe/London") {
  // Asia/Dubai
  // Europe/London
  return moment(date).tz(timezone);
}

export function capitalizeFirstLetter(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function convertTimeFrom24To12(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length === 1) {
    return time[0] + " AM";
  } else if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
    return time.join(""); // return adjusted time or original string
  }
}

export function getFileExtension(filename) {
  return filename
    .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
    .toLowerCase();
}

export function getFilterExtraParam(obj) {
  let str = "";
  obj.map(
    (item) =>
      (str += `&filters[${item.name}]=${
        item.value.indexOf("able_") !== -1
          ? capitalizeFirstLetter(item.value)
          : item.value
      }`)
  );
  return str;
}

export function parseTime(s) {
  let c = s.split(":");
  return parseInt(c[0]) * 60 + parseInt(c[1]);
}

export function convertFromMinToHours(min) {
  const hours = min / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  let twoDigitRminutes = rminutes;
  if (rminutes < 10) twoDigitRminutes = `0${rminutes}`;

  const timeIn24 = `${rhours}:${twoDigitRminutes}`;
  const timeIn12 = convertTimeFrom24To12(timeIn24);

  return [timeIn24, timeIn12];
}

export function validURL(str) {
  let pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~#+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

export function floorLevelMapping(property) {
  let level = "";
  if (property.floor_level !== null) {
    level = property.floor_level;
  } else if (property.floor !== null) {
    level = property.floor;
  }

  let str = "";

  if (level === -1) str = <span>Lower Ground floor</span>;
  else if (level === 0) str = <span>Ground floor</span>;
  else if (level === 0.5) str = <span>Raised Ground floor</span>;
  else if (level === 1)
    str = (
      <span>
        1<sup>st</sup> floor
      </span>
    );
  else if (level === 2)
    str = (
      <span>
        2<sup>nd</sup> floor
      </span>
    );
  else if (level === 3)
    str = (
      <span>
        3<sup>rd</sup> floor
      </span>
    );
  else
    str = (
      <span>
        {`${level}`}
        <sup>th</sup> floor
      </span>
    );

  return str;
}

export function getNumberFormatted(
  number,
  index = 0,
  localCode = "en-GB",
  currencyCode = "GBP"
) {
  let formatter = new Intl.NumberFormat(localCode, {
    style: "currency",
    currency: currencyCode,
    maximumSignificantDigits: 10,
  });

  let formatted = formatter.format(number);
  const formattedChecker = parseInt(formatted.substr(1, formatted.length));
  let final;

  if (formattedChecker === 0) {
    final = "POA";
  } else {
    const haveDecimal = formatted.indexOf(".") > -1;
    if (index === 0) {
      if (haveDecimal) {
        final = formatted.substr(index, formatted.indexOf("."));
      } else {
        final = formatted.substr(index, formatted.length);
      }
    } else {
      if (haveDecimal) {
        final = formatted.substr(index, formatted.indexOf(".") - 1);
      } else {
        final = formatted.substr(index, formatted.length);
      }
    }
  }

  return final;
}

export function getNumberShortFormatted(num) {
  if (num > 999 && num < 1000000) {
    return `£${num / 1000}K`; // convert to K for number from > 1000 < 1 million
  } else if (num >= 1000000 && num < 1000000000) {
    return `£${num / 1000000}M`; // convert to M for number from > 1 million
  } else if (num < 1000) {
    return `£${num}`; // if value < 1000, nothing to do
  }
}

export function convertFloorArea(value, type = "m") {
  if (type === "m") {
    // from ft to m
    return Math.ceil(value * 0.092903);
  } else {
    // from m to ft
    return Math.ceil(value / 0.092903);
  }
}

function dateComparisonFormatter(cell) {
  if (!cell) {
    return "";
  }
  return `${
    moment(cell).format("YYYY-MM-DD")
      ? moment(cell).format("YYYY-MM-DD")
      : moment(cell).format("YYYY-MM-DD")
  }`;
}

export function isValidHttpUrl(str) {
  // const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
  //   str
  // );
  // return pattern;
  const pattern =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(
      str
    );
  return pattern;
}

export function addHttpToURL(url) {
  if (!url) return "";
  if (!url.match(/^[a-zA-Z]+:\/\//)) {
    return `http://${url}`;
  }
  return url;
}

export function hexToRgba(hex, opacity) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      "," +
      opacity +
      ")"
    );
  }
  throw new Error("Bad Hex");
}

export default {
  dateFormatter,
  dateUTCFormatter,
  dateNowFormatter,
  dateTimeFormatter,
  dateTime24Formatter,
  timeFormatter,
  isTodayFormat,
  isYesterdayFormat,
  isBeforeFormat,
  isEarliestBeforeLatest,
  convertTimeFrom24To12,
  changeDateToTimezone,
  changeDateToUTC,
  capitalizeFirstLetter,
  getFilterExtraParam,
  getFileExtension,
  parseTime,
  convertFromMinToHours,
  validURL,
  floorLevelMapping,
  getNumberFormatted,
  convertFloorArea,
  getNumberShortFormatted,
  isValidHttpUrl,
  hexToRgba,
};
