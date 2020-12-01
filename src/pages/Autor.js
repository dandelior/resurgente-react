import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
    Link
} from "react-router-dom";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import 'moment/locale/es'

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Autor() {
    const [postData, setPostData] = useState(null);
    const [numberPosts, setNumberPosts] = useState(9);
    let [loadMoreMessage, msj] = useState('Cargar más');
    const moment = require('moment');
    const { slug } = useParams();
    let from = 0;
    // let to = 9;
    let history = useHistory();

    let query = `*[_type == "autor" && slug.current == $slug] {
        nombre,
        "articulo": *[_type == "articulo" && references(^._id)] | order(_updatedAt desc){
            titulo,
            fecha,
            "postSlug": slug,
            "nombreTag": tag->nombre,
            "slugTag": tag->slug, 
            imagenDestacada,
            "nombreAutor": autor->nombre, 
            "slugAutor": autor->slug, 
        }[${from}...${numberPosts}]
    }`

    useEffect(() => {
        sanityClient
          .fetch(
            query,
            { slug }
          )
          .then((data) => setPostData(data))
          .catch(console.error);
    }, [query, slug, numberPosts]);

    useEffect(() => {
        return history.listen((location) => { 
            // console.log(`Path cambiado a: ${location.pathname}`) 
            setNumberPosts(9);
        }) 
     },[history]) 

    const loadMore = () => {
        // console.log(postData[0].articulo.length);
        let postsLength = postData[0].articulo.length;
        if (postsLength < numberPosts) {
            console.log('No hay mas posts');
            msj(loadMoreMessage = 'No hay más Artículos');
        } else {
            console.log('Se cargaron más posts');
            setNumberPosts(numberPosts + 10);
        }
    }

    let nombreAutor;
    let articulos;

    if (postData != null && postData.length) {
        nombreAutor = postData[0].nombre;
        articulos = postData[0].articulo;
        return (
            <>
                <Helmet>
                    <title>{nombreAutor} — Resurgente</title>
                    <meta name="title" content={`${nombreAutor} — Resurgente`} />
                    <meta name="description" content="Fe & Cultura" />
    
                    {/* Open Graph / Facebook */}
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`https://resurgente.com/autor/${slug}`} />
                    <meta property="og:title" content={`${nombreAutor} — Resurgente`} />
                    <meta property="og:description" content="Fe & Cultura" />
                    <meta property="og:image" content={'https://resurgente.com'+ process.env.PUBLIC_URL + '/img/land.jpg'} />
    
                    {/* Twitter */}
                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content={`https://resurgente.com/autor/${slug}`} />
                    <meta property="twitter:title" content={`${nombreAutor} — Resurgente`} />
                    <meta property="twitter:description" content="Fe & Cultura" />
                    <meta property="twitter:image" content={'https://resurgente.com'+ process.env.PUBLIC_URL + '/img/land.jpg'} />
                </Helmet>
                <section className={`grid-articles grid-on-category`}>
                    <div className="grid-articles-wrapper pd-lr">
                        <header className="section-header">
                            <h6 className="section-title">
                                {nombreAutor}
                            </h6>
                        </header>
                        <div className="articles-grid">
    
                            {articulos &&
                                articulos.map((post) => post.postSlug && (
                                <div className="item post-class">
                                    <Link to={`${'/'+post.postSlug.current}`}>
                                        <div className="img" style={{ backgroundImage: 'url('+urlFor(post.imagenDestacada).url()+')' }}></div>
                                    </Link>
                                    <div className="data">
                                        <h6 className="date-tags">
                                            {/* {post.fecha} */}
                                            {moment(post.fecha).locale('es').format('LL')}
                                            <span>&nbsp;—&nbsp;</span>
                                            <Link to={`/tag/`+post.slugTag.current} className="tag tag-id slug">
                                                #{post.nombreTag}
                                            </Link>
                                        </h6>
                                        <Link to={`${'/'+post.postSlug.current}`}>
                                            <h3 className="article-title">
                                                {post.titulo}
                                            </h3>
                                        </Link>
                                    </div>
                                </div>
                            ))}
    
                        </div>
                        <div className="more">
                            <button className={`loadMore`} onClick={loadMore}>
                                {loadMoreMessage}
                            </button>
                        </div>
    
                    </div>
                </section>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>Página no encontrada</title>
            </Helmet>
            <div className="no-page">
                <h1>
                    <span className="highlighten">
                        {/* (╯°□°）╯ */}
                            ლ(ಠ益ಠლ)
                    </span>
                        <br />
                        No encontramos
                        <br />
                        lo que buscas
                </h1>
                <p>
                    Por favor, comprueba que el link no sea antiguo.<br />
                    Hemos borrado cierto contenido para hacer Resurgente cada día mejor. <br />
                    Si tienes dudas contactanos a <a href="mailto:contacto@resurgente.com">contacto@resurgente.com</a>
                </p>
            </div>
        </>
    );
}