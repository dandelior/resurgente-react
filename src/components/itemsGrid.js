import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import {
    Link
} from "react-router-dom";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import 'moment/locale/es';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function ItemsGrid({name, slug, hasLinkToMore, isCategory, hasHashtag, isTag, from, to}) {

    const [allPostsData, setAllPosts] = useState(null);
    const moment = require('moment');

    let query;

    if (isTag) {
        query = `*[_type == "articulo" && tag->nombre == "${name}"] | order(_createdAt desc) {
            titulo, slug, fecha, imagenDestacada, esDestacado, "nombreTag": tag->nombre, "nombreAutor": autor->nombre, "slugAutor": autor->slug, "slugTag": tag->slug
        }[${from}...${to}]`;
    } else {
        query = `*[_type == "articulo"] | order(_createdAt desc){
            titulo, slug, fecha, imagenDestacada, esDestacado, "nombreTag": tag->nombre, "slugTag": tag->slug, "nombreAutor": autor->nombre, "slugAutor": autor->slug
        }[${from}...${to}]`;
    }

    useEffect(() => {
        sanityClient
          .fetch(query)
          .then((data) => setAllPosts(data))
          .catch(console.error);
    });

    let posts = allPostsData;
    // console.log(posts);

    return (
        <section className={`grid-articles ${isCategory && (`grid-on-category`)}`}>
            <div className="grid-articles-wrapper pd-lr">
                <header className="section-header">
                    <h6 className="section-title">
                        {name}
                    </h6>
                    {hasLinkToMore && (
                        <Link to={`/tag/${slug}`}>Ver Todos</Link>
                    )}
                </header>
                <div className="articles-grid">

                    {posts &&
                        posts.map((post) => (
                        <div className="item post-class">
                            <Link to={post.slug.current}>
                                <div className="img" style={{ backgroundImage: 'url('+urlFor(post.imagenDestacada).url()+')' }}></div>
                            </Link>
                            <div className="data">
                                <h6 className="date-tags">
                                    {moment(post.fecha).locale('es').format('LL')}
                                    {/* {post.fecha} */}
                                    {hasHashtag && (
                                        <>
                                            <span>&nbsp;—&nbsp;</span>
                                            <Link to={`/tag/`+post.slugTag.current} className="tag tag-id slug">
                                                #{post.nombreTag}
                                            </Link>
                                        </>
                                    )}
                                </h6>
                                <Link to={post.slug.current}>
                                    <h3 className="article-title">
                                        {post.titulo}
                                    </h3>
                                </Link>
                                <h6 className="author">
                                    por <Link to={`autor/`+post.slugAutor.current}>
                                        {post.nombreAutor}
                                    </Link> 
                                </h6>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}