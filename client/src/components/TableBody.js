import React from 'react';
import { Link } from 'react-router-dom';

export default function TableBody(props) {
  const items = props.items;
  const auth = props.auth;

  if (items.length > 0) {
    const itemsBody = items.map((item, index) => (
      <tr key={index}>
        <td className={item.completed ? 'completed' : null}>
          {item.description}{' '}
        </td>
        <td className={item.completed ? 'completed' : null}>
          {item.responsible}
        </td>
        <td className={item.completed ? 'completed' : null}>{item.priority}</td>
        <td
          className="status"
          style={item.completed ? { color: 'green' } : { color: 'red' }}
        >
          {item.completed
            ? String.fromCharCode(10004)
            : String.fromCharCode(10006)}
        </td>
        {auth ? (
          <td>
            <Link
              to={{ pathname: `/edit/${item._id}`, state: { item } }}
              className="btn btn-primary"
            >
              Edit
            </Link>

            <Link
              to={{ pathname: `/delete/${item._id}`, state: { item } }}
              className="btn btn-danger"
            >
              Delete
            </Link>
          </td>
        ) : (
          <td></td>
        )}
      </tr>
    ));

    return <tbody>{itemsBody}</tbody>;
  } else {
    return (
      <tbody>
        <tr>
          <td colSpan="5">No Data to Display</td>
        </tr>
      </tbody>
    );
  }
}
