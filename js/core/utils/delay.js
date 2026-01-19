/**
 * @param {number} ms
 */
export default async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
