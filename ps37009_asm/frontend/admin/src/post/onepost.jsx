import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';


function OnePost() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {

  }, []);

  return (
    <div>

    </div>
  );
}