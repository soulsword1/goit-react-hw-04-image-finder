export function FetchPixabayApi(imgName, page) {
  const key = '7874354-517214212a7de5151c1e37373';
  const per_page = 12;
  const q = imgName;
  const searchParams = new URLSearchParams({
    q,
    page,
    per_page,
    key,
    image_type: 'photo',
    orientation: 'horizontal',
  });

  const url = `https://pixabay.com/api/?${searchParams}`;
  return fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error("Картинки не найдены"));
      })
}
