export const categories = [
  "Пенопласт",
  "Праздники",
  "Декор",
  "Оформление",
  "Пластик",
  "Стеклопластик",
  "Полипропилен",
  "Дерево",
  "Бетон",
  "Метал",
  "Светодиодные фигуры",
] as const;

export type ServiceCard = {
  id: number;
  name: string;
  image: string;
};

export const serviceCards: ServiceCard[] = [
  { id: 1, name: "Садово парковые фигуры", image: "/img/prew_1.jpg" },
  { id: 2, name: "Буквы и цифры", image: "/img/prew_2.jpg" },
  { id: 3, name: "Выставочные стенды", image: "/img/prew_3.jpg" },
  { id: 4, name: "Масштабные фигуры", image: "/img/prew_4.jpg" },
  { id: 5, name: "3D модели", image: "/img/prew_5.jpg" },
  { id: 6, name: "Праздничный декор", image: "/img/prew_6.jpg" },
  { id: 7, name: "Муляжи", image: "/img/prew_7.jpg" },
  { id: 8, name: "Кинетические фигуры", image: "/img/prew_8.jpg" },
  { id: 9, name: "Садово парковые фигуры", image: "/img/prew_9.jpg" },
  { id: 10, name: "Архитектурный декор", image: "/img/prew_3.jpg" },
  { id: 11, name: "Рекламные конструкции", image: "/img/prew_6.jpg" },
  { id: 12, name: "Тематические инсталляции", image: "/img/prew_8.jpg" },
];
