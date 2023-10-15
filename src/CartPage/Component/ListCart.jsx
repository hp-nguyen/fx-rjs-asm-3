import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import convertMoney from '../../convertMoney';

ListCart.propTypes = {
	listCart: PropTypes.array,
	onDeleteCart: PropTypes.func,
	onUpdateCount: PropTypes.func,
};

ListCart.defaultProps = {
	listCart: [],
	onDeleteCart: null,
	onUpdateCount: null,
};

function ListCart(props) {
	const { cart, onDeleteProduct, onUpdateCount } = props;
	const handlerChangeText = (e) => {
		console.log(e.target.value);
	};
	const handlerDown = (idUser, idProduct, count) => {
		if (!onUpdateCount) {
			return;
		}

		if (count === 1) {
			return;
		}

		//Update số lượng sp
		const updateCount = parseInt(count) - 1;

		onUpdateCount(idUser, idProduct, updateCount);
	};

	const handlerUp = (idUser, idProduct, count) => {
		if (!onUpdateCount) {
			return;
		}

		//Update số lượng sp
		const updateCount = parseInt(count) + 1;

		onUpdateCount(idUser, idProduct, updateCount);
	};

	return (
		<div className='table-responsive mb-4'>
			<table className='table'>
				<thead className='bg-light'>
					<tr className='text-center'>
						<th className='border-0' scope='col'>
							{' '}
							<strong className='text-small text-uppercase'>
								Image
							</strong>
						</th>
						<th className='border-0' scope='col'>
							{' '}
							<strong className='text-small text-uppercase'>
								Product
							</strong>
						</th>
						<th className='border-0' scope='col'>
							{' '}
							<strong className='text-small text-uppercase'>
								Price
							</strong>
						</th>
						<th className='border-0' scope='col'>
							{' '}
							<strong className='text-small text-uppercase'>
								Quantity
							</strong>
						</th>
						<th className='border-0' scope='col'>
							{' '}
							<strong className='text-small text-uppercase'>
								Total
							</strong>
						</th>
						<th className='border-0' scope='col'>
							{' '}
							<strong className='text-small text-uppercase'>
								Remove
							</strong>
						</th>
					</tr>
				</thead>
				<tbody>
					{cart &&
						cart.map((product) => (
							<tr className='text-center' key={product.idProduct}>
								<td className='pl-0 border-0'>
									<div className='media align-items-center justify-content-center'>
										<Link
											className='reset-anchor d-block animsition-link'
											to={`/detail/${product.idProduct}`}>
											<img src={product.img} alt='...' width='70' />
										</Link>
									</div>
								</td>
								<td className='align-middle border-0'>
									<div className='media align-items-center justify-content-center'>
										<Link
											className='reset-anchor h6 animsition-link'
											to={`/detail/${product.idProduct}`}>
											{product.nameProduct}
										</Link>
									</div>
								</td>

								<td className='align-middle border-0'>
									<p className='mb-0 small'>
										{convertMoney(product.priceProduct)} VND
									</p>
								</td>
								<td className='align-middle border-0'>
									<div className='quantity justify-content-center'>
										<button
											className='dec-btn p-0'
											style={{ cursor: 'pointer' }}
											onClick={() =>
												handlerDown(
													product.idUser,
													product.idProduct,
													product.count
												)
											}>
											<i className='fas fa-caret-left'></i>
										</button>
										<input
											className='form-control form-control-sm border-0 shadow-0 p-0'
											type='text'
											value={product.count}
											onChange={handlerChangeText}
										/>
										<button
											className='inc-btn p-0'
											style={{ cursor: 'pointer' }}
											onClick={() => {
												handlerUp(
													product.idUser,
													product.idProduct,
													product.count
												);
											}}>
											<i className='fas fa-caret-right'></i>
										</button>
									</div>
								</td>
								<td className='align-middle border-0'>
									<p className='mb-0 small'>
										{convertMoney(
											parseInt(product.priceProduct) *
												parseInt(product.count)
										)}{' '}
										VND
									</p>
								</td>
								<td className='align-middle border-0'>
									<a
										className='reset-anchor remove_cart'
										style={{ cursor: 'pointer' }}
										onClick={() =>
											onDeleteProduct(product.idUser, product.idProduct)
										}>
										<i className='fas fa-trash-alt small text-muted'></i>
									</a>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export default ListCart;
