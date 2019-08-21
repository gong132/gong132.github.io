export default function(props) {
    console.log('propspropspropsprops');
    return (
      <>
        <Header />
        { props.children }
        <Footer />
      </>
    );
  }
  