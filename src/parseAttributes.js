import { from } from './utils/list';
import { parseDuration, parseDate } from './utils/time';

// TODO: maybe order these in some way that makes it easy to find specific attributes
export const parsers = {
  /**
   * Specifies the duration of the entire Media Presentation. Format is a duration string
   * as specified in ISO 8601
   *
   * @param {String} value
   *        value of attribute as a string
   * @return {Number}
   *         The duration in seconds
   */
  mediaPresentationDuration(value) {
    return parseDuration(value);
  },

  /**
   * Specifies the Segment availability start time for all Segments referred to in this
   * MPD. For a dynamic manifest, it specifies the anchor for the earliest availability
   * time. Format is a date string as specified in ISO 8601
   *
   * @param {String} value
   *        value of attribute as a string
   * @return {Number}
   *         The date as seconds from unix epoch
   */
  availabilityStartTime(value) {
    return parseDate(value) / 1000;
  },

  /**
   * Specifies the smallest period between potential changes to the MPD. Format is a
   * duration string as specified in ISO 8601
   *
   * @param {String} value
   *        value of attribute as a string
   * @return {Number}
   *         The duration in seconds
   */
  minimumUpdatePeriod(value) {
    return parseDuration(value);
  },

  /**
   * Specifies the duration of the smallest time shifting buffer for any Representation
   * in the MPD. Format is a duration string as specified in ISO 8601
   *
   * @param {String} value
   *        value of attribute as a string
   * @return {Number}
   *         The duration in seconds
   */
  timeShiftBufferDepth(value) {
    return parseDuration(value);
  },

  /**
   * Specifies the PeriodStart time of the Period relative to the availabilityStarttime.
   * Format is a duration string as specified in ISO 8601
   *
   * @param {String} value
   *        value of attribute as a string
   * @return {Number}
   *         The duration in seconds
   */
  start(value) {
    return parseDuration(value);
  },

  /**
   * Specifies the width of the visual presentation
   *
   * @param {String} value
   *        value of attribute as a string
   * @return {Number}
   *         The parsed width
   */
  width(value) {
    return parseInt(value, 10);
  },

  /**
   * Specifies the height of the visual presentation
   *
   * @param {String} value
   *        value of attribute as a string
   * @return {Number}
   *         The parsed height
   */
  height(value) {
    return parseInt(value, 10);
  },

  /**
   * Specifies the bitrate of the representation
   *
   * @param {String} value
   *        value of attribute as a string
   * @return {Number}
   *         The parsed bandwidth
   */
  bandwidth(value) {
    return parseInt(value, 10);
  },

  /**
   * Specifies the number of the first Media Segment in this Representation in the Period
   *
   * @param {String} value
   *        value of attribute as a string
   * @return {Number}
   *         The parsed number
   */
  startNumber(value) {
    return parseInt(value, 10);
  },

  /**
   * Specifies the timescale in units per seconds
   *
   * @param {String} value
   *        value of attribute as a string
   * @return {Number}
   *         The aprsed timescale
   */
  timescale(value) {
    return parseInt(value, 10);
  },

  /**
   * Specifies the constant approximate Segment duration
   * NOTE: The <Period> element also contains an @duration attribute. This duration
   *       specifies the duration of the Period. This attribute is currently not
   *       supported by the rest of the parser, however we still check for it to prevent
   *       errors.
   * @param {String} value
   *        value of attribute as a string
   * @return {Number}
   *         The parsed duration
   */
  duration(value) {
    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue)) {
      return parseDuration(value);
    }

    return parsedValue;
  },

  /**
   * Specifies the Segment duration, in units of the value of the @timescale.
   *
   * @param {String} value
   *        value of attribute as a string
   * @return {Number}
   *         The parsed duration
   */
  d(value) {
    return parseInt(value, 10);
  },

  /**
   * Specifies the MPD start time, in @timescale units, the first Segment in the series
   * starts relative to the beginning of the Period
   *
   * @param {String} value
   *        value of attribute as a string
   * @return {Number}
   *         The parsed time
   */
  t(value) {
    return parseInt(value, 10);
  },

  /**
   * Specifies the repeat count of the number of following contiguous Segments with the
   * same duration expressed by the value of @d
   *
   * @param {String} value
   *        value of attribute as a string
   * @return {Number}
   *         The parsed number
   */
  r(value) {
    return parseInt(value, 10);
  },

  /**
   * Default parser for all other attributes. Acts as a no-op and just returns the value
   * as a string
   *
   * @param {String} value
   *        value of attribute as a string
   * @return {String}
   *         Unparsed value
   */
  DEFAULT(value) {
    return value;
  }
};

/**
 * Gets all the attributes and values of the provided node, parses attributes with known
 * types, and returns an object with attribute names mapped to values.
 *
 * @param {Node} el
 *        The node to parse attributes from
 * @return {Object}
 *         Object with all attributes of el parsed
 */
export const parseAttributes = (el) => {
  if (!(el && el.attributes)) {
    return {};
  }

  return from(el.attributes)
    .reduce((a, e) => {
      const parseFn = parsers[e.name] || parsers.DEFAULT;

      a[e.name] = parseFn(e.value);

      return a;
    }, {});
};
