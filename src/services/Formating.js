import { format, compareAsc } from 'date-fns'

/**
 * format time to HH:MM
 * @param {string} time - time to format
 * @returns {string} - formatted time
 */
export function formatTime(time) {
    if (time.length > 5) {
        return time.substring(0, 5)
    }
    return time
}

/**
 * format a simple date to DD.MM.YYY
 * @param {string} date - date to format 
 * @returns {string} - formatted time
 */
export function formatDate(date) {
    date = new Date(date);
    return format(date, 'dd.MM.yyyy');
    
}

/**
 * format an event date (if range or not)
 * @param {string} startDate - starting date
 * @param {string} endDate - ending date
 * @returns {string} formatted date
 */
export function formatEventDate(startDate, endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    // Check if dates are similar or ranged
    if (compareAsc(startDate, endDate) == 0) {
        return format(startDate, 'd LLL yyyy').toUpperCase();
    } else {
        return (format(startDate, 'd') + '-' + format(endDate, 'd LLL yyyy')).toUpperCase();
    }
}

/**
 * Capitalize first letter of a string
 * @param {string} str - string to capitalize first letter
 * @returns {string} string with first letter capitalized
 */
export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalize an entire string
 * @param {string} str - string to capitalize
 * @returns {string} string capitalized
 */
export function capitalizeWord(str) {
    return str.toUpperCase();
}

