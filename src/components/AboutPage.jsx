function AboutPage({navToHome}) {
  return (
    <div>
      <button onClick={navToHome}>Home</button>
      <h1>About Page</h1>
      <p>Instructions for play</p>
      <p>Request for feedback</p>
      <p>Background</p>
    </div>
  );
}

export default AboutPage;
