import React, { FC } from 'react';
import { FlatSelect } from '@uikit/components/form';
import { Link } from 'react-router-dom';

const Styleguide: FC = () => {
  return (
    <div>
      <h1>Hi</h1>
      <h2>Hi</h2>
      <h3>Hi</h3>
      <h4>Hi</h4>
      <h5>Hi</h5>
      <h6>Hi</h6>
      <p>Lorem ipsum</p>
      <p>
        Lorem ipsum <br /> with break
      </p>
      <ul className="title-list">
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
      </ul>
      <ul>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
      </ul>
      <Link to="/auth/login">To Login</Link> <br />
      <a href="https://google.com" className="external">
        External
      </a>
      <br />
      <label htmlFor="hiddenInput1">
        A label
        <input id="hiddenInput1" type="hidden" />
      </label>
      <br />
      <label htmlFor="hiddenInput2" className="is-invalid">
        A invalid label
        <input id="hiddenInput2" type="hidden" />
      </label>
      <br />
      <FlatSelect
        id="sadfa"
        items={{
          grouped: [
            {
              group: 'Foo',
              items: [
                { label: 'Foo', value: 'foo' },
                { label: 'Foo2', value: 'foo2' },
                { label: 'Foo3', value: 'foo3' },
              ],
            },
          ],
          items: [
            { label: 'Bar', value: 'bar', disabled: true },
            { label: 'Baz', value: 'baz' },
            { label: 'Buz', value: 'buz' },
            { label: 'Biz', value: 'biz' },
            { label: 'Bez', value: 'bez' },
          ],
        }}
        label="Select a foo"
        name="foo"
        register={() => {}}
        value="foo"
      />
    </div>
  );
};

export default Styleguide;
