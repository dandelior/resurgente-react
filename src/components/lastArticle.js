import React, { useEffect, useState } from "react";
import {
    Link
} from "react-router-dom";
import moment from 'moment/min/moment-with-locales'
import sanityClient from "./../client.js";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function LastArticle() {
    const [lastPostsData, setLastPost] = useState(null);

    useEffect(() => {
        sanityClient
          .fetch(
            `*[_type == "articulo"] | order(_createdAt desc) {
                titulo, slug, fecha, imagenDestacada, "nombreTag": tag->nombre, "slugTag": tag->slug, "nombreAutor": autor->nombre, "slugAutor": autor->slug
            }[0]`
          )
          .then((data) => setLastPost(data))
          .catch(console.error);
      }, []);

    // if(!lastPostsData) return <p>No hay mano</p>;
    if(!lastPostsData) return "";

    return (
        <section className="last-article">

            <div className="last-article-wrapper pd-lr">
                {/* <Link to="/" className="img"> */}
                <Link to={lastPostsData.slug.current} className="img">
                    {/* <div className="img-inner" style={{ backgroundImage: 'url()' }}></div> */}
                    <div className="img-inner" style={{ backgroundImage: 'url('+urlFor(lastPostsData.imagenDestacada).url()+')' }}></div>
                </Link>
                <div className="data">
                    <h6 className="section-title">Último Artículo</h6>
                    <Link to={lastPostsData.slug.current}>
                        <h1 className="featured-title">
                            {lastPostsData.titulo}
                        </h1>
                    </Link>
                    <h6 className="featured-details">
                        <span className="hashtags">
                            <Link to={`tag/`+lastPostsData.slugTag.current} title="titulo" className="tag tag-id slug">
                                #{lastPostsData.nombreTag}
                            </Link>
                        </span>
                        <span className="date-author">
                        {moment(lastPostsData.fecha).locale('es').format('LL')} — Por <Link to={`autor/`+lastPostsData.slugAutor.current}>{lastPostsData.nombreAutor}</Link>
                        </span>
                    </h6>
                </div>
            </div>

        </section>
    )
}