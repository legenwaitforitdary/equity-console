import * as React from 'react'

type Props = { children?: any }

export default function Root(props: Props) {
  return (
    <div>
      <div className="container fixedcontainer">
        {props.children}
      </div>
      <footer className="page-footer">
        <div className="container fixedcontainer">
        <hr/>
          &copy; 2017 Chain Inc
        </div>
      </footer>
    </div>
  )
}
