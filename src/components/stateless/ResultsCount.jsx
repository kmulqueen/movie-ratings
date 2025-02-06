import PropTypes from "prop-types";

function ResultsCount({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

ResultsCount.propTypes = {
  movies: PropTypes.array,
};

export default ResultsCount;
