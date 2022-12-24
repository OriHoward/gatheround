import { Text, StyleSheet, View, Dimensions } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Button } from 'react-native-paper'
import { AxiosContext } from '../../../context/AxiosContext'
import SelectDropdown from 'react-native-select-dropdown'
import CustomButton from '../../components/CustomButton'
const screenWidth = Dimensions.get('window').width

const SearchScreen = () => {
	const [dataToDisplay, setDataToDispay] = useState([])
	const { authAxios } = useContext(AxiosContext)
	const [availableCities, setAvailableCities] = useState([])
	const [availableProfessions, setAvailableProfessions] = useState([])
	const [city, setCity] = useState('')
	const [desiredProfession, setDesiredProfession] = useState('')

	const fetchDistinctValues = async () => {
		const resp = await authAxios.get(`/business-search-meta`)
		const { data } = resp
		const { distinctCities = [], distinctProfessions = [] } = data
		setAvailableCities(distinctCities)
		setAvailableProfessions(distinctProfessions)
	}

	useEffect(() => {
		fetchDistinctValues()
	}, [])
	/*
    This function sends a get request to recieve all the business profiles that match the search query.
  */

	const onSearchClick = async () => {
		try {
			const searchObj = { city, desiredProfession }
			let queryParamsArray = Object.keys(searchObj)
				.filter((itemKey) => searchObj[itemKey])
				.map((key) => `${key}=${searchObj[key]}`)
			let searchQueryString = queryParamsArray.length ? `?${queryParamsArray.join('&')}` : ''
			const resp = await authAxios.get(`/business-search${searchQueryString}`)
			const { data } = resp
			const { results = [] } = data
			setDataToDispay(results)
		} catch (error) {
			console.error(error)
			setDataToDispay([])
		}
	}
	const cleanData = () => {
		setDataToDispay([])
		setCity('')
		setDesiredProfession('')
	}
	return (
		<View style={styles.root}>
			<View style={styles.root}>
				<View style={styles.parentFilter}>
					<View style={styles.dropDownContainer}>
						<SelectDropdown
							data={availableCities}
							defaultButtonText={'Select a city'}
							onSelect={(selectedItem, index) => {
								setCity(selectedItem)
							}}
							buttonTextAfterSelection={(selectedItem, index) => {
								return city ? city : 'Select a city'
							}}
							rowTextForSelection={(item, index) => {
								return item
							}}
						/>
					</View>
					<View style={styles.dropDownContainer}>
						<SelectDropdown
							data={availableProfessions}
							defaultButtonText={'Select Profession'}
							onSelect={(selectedItem, index) => {
								setDesiredProfession(selectedItem)
							}}
							buttonTextAfterSelection={(selectedItem, index) => {
								return desiredProfession ? desiredProfession : 'Select a profession'
							}}
							rowTextForSelection={(item, index) => {
								return item
							}}
						/>
					</View>
				</View>
				<CustomButton text="Search" onPress={onSearchClick} />
				<Button color="black" uppercase={false} onPress={cleanData}>
					Clear
				</Button>
			</View>
			<View>
				{dataToDisplay.map((entry) => {
					const { id, profession, country, city, phone_number, price, currency, package_name, description } = entry
					return (
						<View key={id} style={styles.searchResultWrapper}>
							<View style={styles.searchResult}>
								<Text style={styles.resultText}>Profession: {profession}</Text>
								<Text style={styles.resultText}>Country : {country}</Text>
								<Text style={styles.resultText}>City: {city}</Text>
								<Text style={styles.resultText}>Package Name: {package_name}</Text>
								<Text style={styles.resultText}>Description: {description}</Text>
								<Text style={styles.resultText}>Price :{price}</Text>
								<Text style={styles.resultText}>Currency :{currency}</Text>
								<Text style={styles.resultText}>Phone number :{phone_number}</Text>
							</View>
						</View>
					)
				})}
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	root: {
		alignSelf: 'center',
		alignItems: 'center',
		paddingTop: 30,
		maxWidth: 350,
	},
	searchResult: {
		borderColor: 'black',
		backgroundColor: '#dddddd',
		borderWidth: 2,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	searchResultWrapper: {
		paddingTop: 10,
		justifyContent: 'space-between',
	},
	resultText: {
		fontSize: 16,
		fontWeight: 'bold',
		padding: 6,
	},
	parentFilter: {
		flexDirection: 'row',
	},
	dropDownContainer: {
		width: screenWidth / 2,
	},
})

export default SearchScreen
