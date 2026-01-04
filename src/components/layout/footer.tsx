export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} GrowthOS. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
