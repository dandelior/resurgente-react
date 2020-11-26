import React from "react";
import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import sanityClient from "../client.js";
import LastArticle from "../components/lastArticle";
import ItemsGrid from "../components/itemsGrid";
import ItemFeatured from "../components/itemFeatured";

export default function Home() {
    return (
        <>
            <Helmet>
                <title>Resurgente — Fe & Cultura</title>
                <meta name="title" content="Resurgente — Fe & Cultura" />
                <meta name="description" content="Fe & Cultura" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://resurgente.com/" />
                <meta property="og:title" content="Resurgente — Fe & Cultura" />
                <meta property="og:description" content="Fe & Cultura" />
                <meta property="og:image" content={'https://resurgente.com'+ process.env.PUBLIC_URL + '/img/land.jpg'} />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://resurgente.com/" />
                <meta property="twitter:title" content="Resurgente — Fe & Cultura" />
                <meta property="twitter:description" content="Fe & Cultura" />
                <meta property="twitter:image" content={'https://resurgente.com'+ process.env.PUBLIC_URL + '/img/land.jpg'} />
            </Helmet>
            {/* Ultimo Articulo */}
            <LastArticle />
            {/* Recientes */}
            <ItemsGrid name="Recientes" hasLinkToMore={false} hasHashtag={true} from="1" to="4" />
            {/* Wide Width Featured */}
            <ItemFeatured />
            {/* #Fe */}
            <ItemsGrid name="Fe" slug="fe" isTag={true} hasLinkToMore={true} from="0" to="3" />
            {/* #Vida */}
            <ItemsGrid name="Vida" slug="vida" isTag={true} hasLinkToMore={true} from="0" to="3" />
            {/* #Cultura */}
            <ItemsGrid name="Cultura" slug="cultura" isTag={true} hasLinkToMore={true} from="0" to="3" />
        </>
    )
}