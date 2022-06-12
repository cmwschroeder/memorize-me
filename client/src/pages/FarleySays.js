import "../FarleySays.css";
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import FarleyCard from "../components/FarleyCard";
import { addHighscore, updateHighscore } from '../utils/Helpers';
import gameover from '../assets/gameover.mp3'


import { Howl } from 'howler'
import correct from '../assets/correct.mp3'

const correctsound = new Howl({
    src: [correct],
    html5: true,
    preload: true,
})
const gameoversound = new Howl({
    src: [gameover],
    html5: true,
    preload: true,
})

function FarleySays() {

  

export default FarleySays;