import React from 'react'
import {
	Modal,
	View,
	Text,
	StyleSheet,
	TextInput,
	DatePickerIOS,
	DatePickerAndroid,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Alert
} from 'react-native'
import moment from 'moment'
import CommonStyles from '../CommonStyles'

const initialState = { description: '', date: new Date() }

export default class AddTask extends React.Component {
	state = { ...initialState }

	save = () => {
		if(!this.state.description.trim()) {
			Alert.alert('Dados Inválidos!', 'Informe uma Descrição para a tarefa.')
			return
		}

		const data = { ...this.state }
		this.props.onSave(data)
		this.setState({ ...initialState })
	}

	render() {
		return (
			<Modal onRequestClose={this.props.onCancel}
				visible={this.props.isVisible}
				animationType='slide'
				transparent={true}>

				<TouchableWithoutFeedback onPress={this.props.onCancel}>
					<View style={styles.offset}></View>
				</TouchableWithoutFeedback>

				<View style={styles.container}>
					<Text style={styles.header}>Nova Tarefa!</Text>
					<TextInput placeholder='Descrição' style={styles.input}
						onChangeText={description => this.setState({ description })}
						value={this.state.description}/>

					<DatePickerIOS mode='date' date={this.state.date}
						onDateChange={date => this.setState({ date })} />

					<View style={{
						flexDirection: 'row',
						justifyContent: 'flex-end'
					}} >
						<TouchableOpacity onPress={this.props.onCancel}>
							<Text style={styles.button}>Cancelar</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.props.save}>
							<Text style={styles.button}>Salvar</Text>
						</TouchableOpacity>
					</View>
				</View>

				<TouchableOpacity onPress={this.props.onCancel}>
					<View style={styles.offset}></View>
				</TouchableOpacity>

			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		justifyContent: 'space-between',
	},
	offset: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,.7)'
	},
	button: {
		margin: 20,
		marginRight: 30,
		color: CommonStyles.colors.default
	},
	header: {
		fontFamily: CommonStyles.fontFamily,
		backgroundColor: CommonStyles.colors.default,
		color: CommonStyles.colors.secondary,
		textAlign: 'center',
		padding: 15,
		fontSize: 15
	},
	input: {
		fontFamily: CommonStyles.fontFamily,
		width: '90%',
		height: 40,
		marginTop: 10,
		marginLeft: 10,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#e3e3e3',
		borderRadius: 5
	}
})