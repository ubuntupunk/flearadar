// components/RssPosts.tsx
// Optional props interface for future use
interface RssPostsProps {
  // Add props here if needed
}

export default function RssPosts(/* props: RssPostsProps */): JSX.Element {
  return (
    <section className="pb-4 pt-4 text-center">
      <div className="mx-auto max-w-7xl pb-4 pt-4">
        <p>Posts Pulled from RSS</p>
        <ul>
          <li>
            <a 
              href="https://muizenmesh.co.za/wp/web/flearadar/2023/07/16/bluebird-garage/" 
              title="From our Blog..."
            >
              Bluebird Garage
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
