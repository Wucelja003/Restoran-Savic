import PageHeader from "../components/PageHeader"

const images = Object.entries(
  import.meta.glob<string>("../assets/images/*.jpg", { eager: true, import: "default" }),
).map(([path, src]) => ({ src, name: path.split("/").pop()! }))

export default function Gallery() {
  return (
    <>
      <PageHeader eyebrow="Ambijent i jela" title="Galerija" image={images[0].src} />
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {images.map((img) => (
            <img
              key={img.name}
              src={img.src}
              alt=""
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          ))}
        </div>
      </section>
    </>
  )
}
