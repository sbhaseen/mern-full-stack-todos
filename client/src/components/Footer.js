import React from 'react';

export default function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()}</p>
      <small>
        A full stack MERN app demo by Shan. See the{' '}
        <a href="https://github.com/sbhaseen/mern-item-list-frontend">
          Git repo
        </a>
        .
      </small>
    </footer>
  );
}
