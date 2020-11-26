import React, { useEffect, useState } from "react";
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