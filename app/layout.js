
import "./globals.css";



export const metadata = {
  title: "wizkle",
  description: "Best place for education",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
