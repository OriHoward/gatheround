import { Text, StyleSheet, View, Dimensions, FlatList, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Button } from 'react-native-paper'
import { AxiosContext } from '../../../context/AxiosContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { List } from 'react-native-paper'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const SearchScreen = () => {
	const [dataToDisplay, setDataToDispay] = useState([])
	const { authAxios } = useContext(AxiosContext)
	const [availableCities, setAvailableCities] = useState([])
	const [availableProfessions, setAvailableProfessions] = useState([])
	const [city, setCity] = useState('')
	const [desiredProfession, setDesiredProfession] = useState('')
	const [priceOrdering, setPriceOrdering] = useState('asc')
	const [expandCity, setExpandCity] = useState(false)
	const [expandProfession, setExpandProfession] = useState(false)
	const [expandOrder, setExpandOrder] = useState(false)

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
			const searchObj = { city, desiredProfession, priceOrdering }
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
		setPriceOrdering('asc')
	}

	const renderSearchItem = ({ item }) => {
		const { id, profession, country, city, phone_number, price, currency, package_name, description } = item
		return (
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
		)
	}
	const getListItems = (expandVal) => (availableOptions, setFunc, setExpander) => {
		return availableOptions.map((option) => {
			return (
				<List.Item
					title={option}
					key={option}
					onPress={() => {
						setFunc(option)
						setExpander(!expandVal)
					}}
				/>
			)
		})
	}
	return (
		<View style={styles.root}>
			<View style={styles.root}>
				<View style={styles.parentFilter}>
					<View style={{ height: 200 }}>
						<List.Section>
							<ScrollView style={{ maxHeight: 150 }}>
								<List.Accordion
									title={city ? `${city}` : 'City'}
									style={{ width: 250, maxWidth: screenWidth / 4 }}
									titleStyle={{ fontSize: 12 }}
									expanded={expandCity}
									onPress={() => {
										setExpandCity(!expandCity)
									}}
								>
									{getListItems(expandCity)(availableCities, setCity, setExpandCity)}
								</List.Accordion>
							</ScrollView>
						</List.Section>
					</View>
					<View style={{ height: 200 }}>
					<List.Section>
						<ScrollView style={{ maxHeight: 150 }}>
							<List.Accordion
								title={desiredProfession ? `${desiredProfession}` : 'Profession'}
								style={{ width: 250, maxWidth: screenWidth / 4 }}
								titleStyle={{ fontSize: 12 }}
								expanded={expandProfession}
								onPress={() => {
									setExpandProfession(!expandProfession)
								}}
							>
								{getListItems(expandProfession)(availableProfessions, setDesiredProfession, setExpandProfession)}
							</List.Accordion>
						</ScrollView>
					</List.Section>
					</View>
					<View style={{ height: 200 }}>
					<List.Section>
						<ScrollView style={{ maxHeight: 150 }}>
							<List.Accordion
								title={`Ordering: ${priceOrdering}`}
								style={{ width: 250, maxWidth: screenWidth / 4 }}
								titleStyle={{ fontSize: 12 }}
								expanded={expandOrder}
								onPress={() => {
									setExpandOrder(!expandOrder)
								}}
							>
								{getListItems(expandOrder)(['asc', 'desc'], setPriceOrdering, setExpandOrder)}
							</List.Accordion>
						</ScrollView>
					</List.Section>
					</View>
					<View style={{ marginTop: 12 }}>
						<Ionicons name={'search-outline'} size={40} color={'blue'} onPress={onSearchClick} />
					</View>
				</View>

				<Button style={{ marginTop: 10 }} color="black" uppercase={false} onPress={cleanData}>
					Clear
				</Button>
			</View>

			<View style={{ height: screenHeight * 0.7, paddingBottom: 20 }}>
				<SafeAreaView style={styles.container}>
					<FlatList
						style={{ width: '100%' }}
						data={dataToDisplay}
						renderItem={renderSearchItem}
						keyExtractor={(item) => item.id}
					/>
				</SafeAreaView>
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
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		marginTop: 15,
	},
	searchResultWrapper: {
		paddingTop: 10,
		justifyContent: 'space-between',
	},
	resultText: {
		fontSize: 14,
		fontWeight: 'bold',
		padding: 4,
	},
	parentFilter: {
		flexDirection: 'row',
	},
	container: {
		flex: 1,
		width: screenWidth * 0.5,
		height: screenHeight * 0.6,
	},
})

export default SearchScreen
