import Image from "next/image";
import Link from 'next/link';

const genres = ["Tất cả", "Hài hước", "Lãng mạn", "Kinh dị", "Truyền thông", "Nấu ăn"];
const authors = [
  { name: "Amy Brecount White", books: 1, image: "/placeholder.svg?height=50&width=50" },
  { name: "Amy L. Peterson", books: 0, image: "/placeholder.svg?height=50&width=50" },
  { name: "Andrea Cremer", books: 1, image: "/placeholder.svg?height=50&width=50" },
  { name: "Andrew Barkley & Paul W. Barkley", books: 1, image: "/placeholder.svg?height=50&width=50" },
  { name: "Annie F. Gilbert", books: 1, image: "/placeholder.svg?height=50&width=50" },
  { name: "Aprilynne Pike", books: 1, image: "/placeholder.svg?height=50&width=50" },
  { name: "Barbara Sleigh", books: 1, image: "/placeholder.svg?height=50&width=50" },
];

const categories = [
  {
    title: "KINH DỊ",
    subtitle: "Những câu chuyện kịch tính và nhiều hơn nữa",
    color: "bg-purple-700",
    image: "/placeholder.svg?height=150&width=300"
  },
  {
    title: "LÃNG MẠN",
    subtitle: "Hãy yêu một cuốn sách ngay hôm nay",
    color: "bg-red-500",
    image: "/cate-romantic.png"
  },
  {
    title: "TRẺ EM",
    subtitle: "Những câu chuyện tuyệt vời cho trẻ nhỏ",
    color: "bg-blue-400",
    image: "/placeholder.svg?height=150&width=300"
  }
];

const books = [
  {
    title: "Bash and Lucy Fetch Confidence",
    author: "Lisa & Michael Cohn",
    cover: "/placeholder.svg?height=300&width=200"
  },
  {
    title: "Shattered",
    author: "Dick Francis",
    cover: "/placeholder.svg?height=300&width=200"
  },
  {
    title: "Freefall",
    author: "Peter Cawdron",
    cover: "/placeholder.svg?height=300&width=200"
  },
  {
    title: "Boring Girls, A Novel",
    author: "Sara Taylor",
    cover: "/placeholder.svg?height=300&width=200"
  }
];

const featuredBooks = [
  { title: "Shattered", author: "Peter Cawdron", pages: 320, cover: "/placeholder.svg" },
  { title: "Freefall", author: "Peter Cawdron", pages: 250, cover: "/placeholder.svg" },
  { title: "Darknet", author: "Matthew Mather", pages: 400, cover: "/placeholder.svg" },
  { title: "Holy Ghosts", author: "David J. Schmidt", pages: 150, cover: "/placeholder.svg" },
];

const gridBooks = [
  { title: "Shattered", author: "Peter Cawdron", pages: 320, cover: "/placeholder.svg" },
  { title: "Freefall", author: "Peter Cawdron", pages: 250, cover: "/placeholder.svg" },
  { title: "Darknet", author: "Matthew Mather", pages: 400, cover: "/placeholder.svg" },
  { title: "Boring Girls, A Novel", author: "Sara Taylor", pages: 300, cover: "/placeholder.svg" },
  { title: "The Girl of Ink and Stars", author: "Kiran M. Hargrave", pages: 280, cover: "/placeholder.svg" },
  { title: "Clever Lands", author: "Lucy Crehan", pages: 350, cover: "/placeholder.svg" },
];

const CustomButton = ({ children, isActive }: { children: React.ReactNode; isActive?: boolean }) => (
  <button
    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out ${
      isActive
        ? "bg-purple-600 text-white hover:bg-purple-700"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    {children}
  </button>
);

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row justify-evenly items-start md:items-start mb-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4 md:mb-0 border-b border-gray-300 mr-4">MỚI NHẤT</h1>
        <nav className="flex items-center ">
          <h2 className="text-2xl font-semibold text-gray-700 mr-5">TÌM KIẾM THEO THỂ LOẠI</h2>
          <ul className="flex flex-wrap gap-2">
            {genres.map((genre, index) => (
              <li key={index}>
                <CustomButton isActive={genre === "Tất cả"}>{genre}</CustomButton>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="flex flex-col md:flex-row gap-8">
        <section className="md:w-1/4">
          <ul className="space-y-4">
            {featuredBooks.map((book, index) => (
              <li key={index} className="flex items-center space-x-4">
                <Image src={book.cover} alt={book.title} width={60} height={90} className="object-cover" />
                <div>
                  <h3 className="font-semibold">{book.title}</h3>
                  <p className="text-sm text-gray-600">tác giả: {book.author}</p>
                  <p className="text-sm">
                    <span className="font-semibold text-gray-800">{book.pages} trang</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4 md:mb-0 border-b  border-gray-300 mt-4">TÁC GIẢ</h1>
          <ul className="space-y-4">
            <div className="border-t border-gray-200">
              {authors.map((author, index) => (
                <div key={index} className="flex items-center py-4 border-b border-gray-200">
                  <Image
                    src={author.image}
                    alt={`${author.name}'s profile`}
                    width={40}
                    height={40}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-base font-medium text-gray-800">{author.name}</h3>
                    <p className="text-sm text-gray-500">{author.books} cuốn sách</p>
                  </div>
                </div>
              ))}
            </div>
          </ul>
        </section>
        <section className="md:w-2/3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {gridBooks.map((book, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image src={book.cover} alt={book.title} width={150} height={225} className="object-cover mb-2" />
                <h3 className="font-semibold text-center">{book.title}</h3>
                <p className="text-sm text-gray-600">tác giả: {book.author}</p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-800">{book.pages} trang</span>
                </p>
              </div>
            ))}
          </div>
          <div className="mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-700">GỢI Ý CHO BẠN</h2>
              <Link href="/all-recommended" className="text-purple-600 hover:underline">
                Tất cả gợi ý &gt;
              </Link>
            </div>
            <div className="flex overflow-x-auto space-x-6 pb-6">
              {books.map((book, index) => (
                <div key={index} className="flex-none w-40">
                  <div className="relative h-60 mb-2">
                    <Image
                      src={book.cover}
                      alt={`Bìa của ${book.title}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">tác giả: {book.author}</p>
                  <div className="flex items-center"></div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button className="px-6 py-2 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-colors duration-300">
                Xem thêm
              </button>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-700">THỂ LOẠI PHỔ BIẾN</h2>
              <Link href="/all-categories" className="text-purple-600 hover:underline">
                Tất cả thể loại &gt;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <div key={index} className={`${category.color} rounded-lg p-6 text-white flex flex-col justify-between`}>
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{category.title}</h3>
                    <p className="text-lg mb-4">{category.subtitle}</p>
                  </div>
                  <div className="relative h-36 w-full overflow-hidden">
                    <Image
                      src={category.image}
                      alt={`${category.title} category`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}