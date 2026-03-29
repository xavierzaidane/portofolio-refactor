function Header() {
  return (
    <div className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-right sm:justify-between ">
      <div className="flex items-right justify-right gap-3 sm:justify-start">
      </div>
      <span className="hidden font-mono text-muted-foreground text-md uppercase tracking-widest sm:block mt-10 mr-10 items-center justify-center ">
        Based in Indonesia <br/>[Currently in China]
      </span>
    </div>
  )
}

export default Header