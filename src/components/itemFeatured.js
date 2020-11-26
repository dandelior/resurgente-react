import React, { useEffect, useState } from "react";
import {
    Link
} from "react-router-dom";
import sanityClient from "./../client.js";
import imageUrlBuilder from "@sanity/image-url";
import 'moment/locale/es'

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function ItemFeatured() {
    const [featuredPostData, setFeaturedPost] = useState(null);
    const moment = require('moment');

    useEffect(() => {
        sanityClient
          .fetch(
            `*[_type == "articulo" && esDestacado == true] | order(_createdAt desc) {
                titulo, slug, fecha, imagenDestacada, esDestacado, "nombreTag": tag->nombre, "nombreAutor": autor->nombre
            }[0]`
          )
          .then((data) => setFeaturedPost(data))
          .catch(console.error);
      }, []);

    // if(!featuredPostData) return <p>No hay mano</p>;
    if(!featuredPostData) return "";

    return (
        <>
            <Link to={featuredPostData.slug.current}>
                <section className="featured-article" style={{ backgroundImage: 'url('+urlFor(featuredPostData.imagenDestacada).url()+')' }}>
                    <div className="wrapper-featured-article pd-lr">
                        <h6 className="date-tags">
                            {moment(featuredPostData.fecha).locale('es').format('LL')}
                        </h6>
                        <h3 className="article-title">
                            {featuredPostData.titulo}
                        </h3>
                        <h6 className="author">
                            por {featuredPostData.nombreAutor}
                        </h6>
                    </div>
                </section>
            </Link>
        </>
    )
}