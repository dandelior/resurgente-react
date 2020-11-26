import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Helmet} from "react-helmet";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { Link } from "react-router-dom";
import 'moment/locale/es'

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Single() {
    const [postData, setPostData] = useState(null);
    const moment = require('moment');

    const { slug } = useParams();
    
    useEffect(() => {
        sanityClient
          .fetch(
            `*[slug.current == $slug]{
                titulo, 
                fecha, 
                contenido, 
                imagenDestacada, 
                "nombreTag": tag->nombre, 
                "slugTag": tag->slug, 
                "nombreAutor": autor->nombre, 
                "slugAutor": autor->slug, 
                slug
           }`,
            { slug }
          )
          .then((data) => setPostData(data[0]))
          .catch(console.error);
    }, [slug]);

    if (!postData) return "";

    let firstText = postData.contenido[0].children[0].text.replace('&nbsp;', ' ')+ '...';

    return (
        <>
            <Helmet>
                <title>{postData.titulo} — Resurgente</title>
                <meta name="description" content={firstText}/>
                <meta name="author" content={postData.nombreAutor} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://resurgente.com/${postData.slug}`} />
                <meta property="og:title" content={`${postData.titulo} — Resurgente`} />
                <meta property="og:description" content={firstText} />
                <meta property="og:image" content={urlFor(postData.imagenDestacada).width(1200).height(628).url()} />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://resurgente.com/${postData.slug}`} />
                <meta property="twitter:title" content={`${postData.titulo} — Resurgente`} />
                <meta property="twitter:description" content={firstText} />
                <meta property="twitter:image" content={urlFor(postData.imagenDestacada).width(1200).height(628).url()} />
            </Helmet>
            <article className="the-article">
        
                <header className="article-header">
                    <h6 className="hashtags">
                        <Link to={`/tag/${postData.slugTag.current}`} className="tag tag-id slug">
                            #{postData.nombreTag}
                        </Link>
                    </h6>
                    <h1 className="article-title">
                        {postData.titulo}
                    </h1>
                    <h6 className="date-author">
                        {/* { postData.fecha } */}
                        {moment(postData.fecha).locale('es').format('LL')}
                        <br />
                        <span>
                            Por <Link to={`/autor/${postData.slugAutor.current}`}>{postData.nombreAutor}</Link>
                        </span>
                    </h6>
                </header>
                
                <div className="img pd-lr">
                    <div className="img-inner" style={{ backgroundImage: 'url(' + urlFor(postData.imagenDestacada).url() + ')' }}></div>
                </div>

                <div className="article-body pd-lr">
                    <BlockContent blocks={postData.contenido} {...sanityClient.config()} />
                </div>

            </article>
        </>
    )
}