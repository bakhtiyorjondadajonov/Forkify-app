export const getJSON = async url => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw Error('No recipe found');
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
