export const getCourses = async (id: number) => {
  const config = useRuntimeConfig();
  const error = ref<unknown>();

  const endpoint = `${config.public.apiBase}/courses/getCourses`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (e) {
    error.value = e;
  }
};
