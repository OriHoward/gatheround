import { Text, StyleSheet, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Searchbar, Button } from 'react-native-paper'
import { AxiosContext } from '../../../context/AxiosContext'
import SelectDropdown from 'react-native-select-dropdown'

const SearchScreen = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [dataToDisplay, setDataToDispay] = useState([])
	const { authAxios } = useContext(AxiosContext)
	const [availableCities, setAvailableCities] = useState([])
	const [availableProfessions, setAvailableProfessions] = useState([])
	const [city, setCity] = useState('')
	const [desiredProfession, setDesiredProfession] = useState('')

	const onChangeSearch = (query) => setSearchQuery(query)

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
			const resp = await authAxios.get(`/business-search?profession=${searchQuery}`)
			const { data } = resp
			const { results = [] } = data
			setDataToDispay(results)
		} catch (error) {
			console.error(error)
			setDataToDispay([])
		}
	}
	return (
		<View style={styles.root}>
			<View style={styles.root}>
      <SelectDropdown
				data={availableCities}
				onSelect={(selectedItem, index) => {
					setCity(selectedItem)
				}}
				buttonTextAfterSelection={(selectedItem, index) => {
					// text represented after item is selected
					// if data array is an array of objects then return selectedItem.property to render after item is selected
					return selectedItem
				}}
				rowTextForSelection={(item, index) => {
					// text represented for each item in dropdown
					// if data array is an array of objects then return item.property to represent item in dropdown
					return item
				}}
			/>
			<SelectDropdown
				data={availableProfessions}
				onSelect={(selectedItem, index) => {
					setDesiredProfession(selectedItem)
				}}
				buttonTextAfterSelection={(selectedItem, index) => {
					// text represented after item is selected
					// if data array is an array of objects then return selectedItem.property to render after item is selected
					return selectedItem
				}}
				rowTextForSelection={(item, index) => {
					// text represented for each item in dropdown
					// if data array is an array of objects then return item.property to represent item in dropdown
					return item
				}}
			/>
				<Searchbar
					onIconPress={onSearchClick}
					placeholder="Search profession"
					onChangeText={onChangeSearch}
					value={searchQuery}
				/>
				<Button color="black" uppercase={false} onPress={() => setDataToDispay([])}>
					Clear
				</Button>
			</View>
			<View>
				{dataToDisplay.map((entry) => {
					const { id, profession, country, city, phone_number } = entry
					return (
						<View key={id} style={styles.searchResultWrapper}>
							<View style={styles.searchResult}>
								<Text style={styles.resultText}>Profession: {profession}</Text>
								<Text style={styles.resultText}>Country : {country}</Text>
								<Text style={styles.resultText}>City: {city}</Text>
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
})

export default SearchScreen
